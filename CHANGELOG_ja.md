# 変更履歴

このプロジェクトの注目すべき変更はすべてこのファイルに記録されます。

## [v2.0.0] - 2026-06-11

### 概要

v2 はポートフォリオサイトの完全な書き直しです。ビルドツールや UI フレームワークからデータ取得パターン・テスト基盤まで、スタック全体を刷新しました。目的は開発体験・実行時パフォーマンス・保守性・モバイル対応の向上です。

---

### ⚙️ ビルドツール

| | v1 (main) | v2 |
|---|---|---|
| バンドラー | Create React App (react-app-rewired) | **Vite** |
| パッケージマネージャー | yarn | **pnpm** |
| TypeScript | CRA 経由 | `tsc -b` + Vite |
| Linter / Formatter | ESLint | **Biome** |

- Create React App を **Vite** に置き換え、HMR とコールドスタートを大幅に高速化
- **yarn** から **pnpm** に移行し、インストール高速化と厳格な依存関係の分離を実現
- ESLint + Prettier を **Biome**（lint + format を一本化）に置き換え
- ワークスペース設定のために `pnpm-workspace.yaml` を追加

---

### 🎨 UI & スタイリング

| | v1 (main) | v2 |
|---|---|---|
| コンポーネントライブラリ | Material UI (MUI) | **DaisyUI** |
| CSS フレームワーク | @emotion/styled | **Tailwind CSS v4** |
| テーマシステム | MUI ThemeProvider | DaisyUI data-theme + CSS 変数 |
| アイコン | MUI Icons / カスタム SVG `.tsx` | **SVGR** (`.svg?react`) |

- **Material UI** を **Tailwind CSS v4 + DaisyUI** に置き換え — バンドルサイズを大幅削減し `@emotion/*` 依存を排除
- インライン SVG コンポーネントを **SVGR** に置き換え — SVG を Vite プラグイン経由で React コンポーネントとしてインポート
- `localStorage` に永続化する **ダーク / ライトテーマ切替** を導入
- GitHub 風 UI コンポーネント（`GithubButton`、`GithubTab`、`GithubChip` など）に `styled-components` を採用

---

### 🏗️ アーキテクチャ

| | v1 (main) | v2 |
|---|---|---|
| ルーティング | react-router-dom (v5 スタイル) | **react-router v7** (createBrowserRouter) |
| データ取得 | `useEffect` によるカスタムフック | **React Router Loaders** + Suspense/Await |
| ローディング状態 | フック内のカスタムフラグ | ページごとの **スケルトンコンポーネント** |
| API キャッシュ | なし | **SHA1 キー + TTL キャッシュ**（`setTimeout` で自動削除） |
| API スロットリング | なし | **@octokit/plugin-throttling** |
| ディレクトリ構造 | `src/pages/`、`src/components/`（フラット） | `src/components/{common,features,ui}/` |
| 環境変数 | `process.env` が散在 | 起動時バリデーション付き**集約 `ENV` モジュール**（`src/constants/env.ts`） |
| SVG アセット | `src/assets/svgs/*.tsx` | `src/components/icons/*.svg`（SVGR） |

主なアーキテクチャ変更点:

- **Loader パターン**: React Router の loader 関数でレンダリング前にデータをプリフェッチ。各機能ページ（`repository`・`skill`・`tree`）に専用の `loader.ts` と `skeleton.tsx` を配置。
- **Suspense/Await**: 非同期データのレンダリングにはすべて `<Suspense>` + `<Await>` を使用。条件分岐による描画ガードを廃止し、ストリーミングに適した構造に。
- **TTL キャッシュ**: Octokit GET レスポンスをリクエストの SHA1 ハッシュをキーとしてメモリキャッシュ。`setTimeout` で `VITE_CACHE_TTL_MS` ミリ秒後にエントリを自動削除し、古いデータとメモリ肥大化の両方を防止。
- **コンポーネント階層**: コンポーネントを `common/`（再利用可能）・`features/`（ページレベル）・`ui/`（デザインシステム / GitHub UI 再現）に再編。

---

### ✨ 追加機能

- **国際化（i18n）**: **Lingui**（`@lingui/react`）による英語 / 日本語の完全対応。言語設定は `localStorage` に永続化。
- **Storybook**: 全コンポーネントに `index.stories.tsx` を用意し、`@storybook/addon-vitest` + Playwright（Chromium）でインタラクションテストを実施。
- **ファイル検索（Go-to-file）**: リポジトリページからアクセスできる、ファイルツリーに対するあいまい検索機能。
- **スキルの可視化**: スキルサイドバーをインタラクティブな **Highcharts** チャート（スキルグループごとの割合バー + 凡例）に刷新。
- **パンくずナビゲーション**: ツリーページにファイルパスのパンくずリストを追加（新規 `Breadcrumbs` コンポーネント）。
- **ローディングスケルトン**: データ取得中のレイアウトシフトを排除するため、各ページ・データ依存コンポーネントに専用スケルトンを配置。
- **レート制限エラーハンドリング**: GitHub API の 401（未認証）を検知 — アクセストークンを消去し `octokit:unauthorized` イベントを発火。レート制限エラーには専用エラー UI を表示。
- **AbortSignal の伝播**: loader の `request.signal` を Octokit 呼び出しに転送し、ナビゲーション時に進行中のリクエストをキャンセル。
- **モバイルレスポンシブ対応**: モバイルレイアウトを全面刷新:
  - レスポンシブグリッドレイアウト（リポジトリページ・プロフィールヘッダー）
  - ヘッダーのモバイル向け三点メニュー（▾）でログイン / ログアウト・言語・テーマを操作
  - タブ・コードブロック・テーブルの横スクロール対応
  - `Container` コンポーネントへの `px-4 md:px-6` グローバルパディング
- **イースターエッグ（Cow Powers）**: `/cow` ページを新ルーターに引き継ぎ。

---

### 🗑️ 削除機能

- **ディスカッション UI**: `src/components/ui/discussion/` 配下（15 コンポーネント以上）を全削除。GitHub Discussions ビューアはポートフォリオのスコープ外と判断。
- **C3 チャート**: `c3` と `@types/c3` 依存を削除。スキル可視化は Highcharts に移行。
- **Google マップリンク**: `LinkGoogleMap` コンポーネントを削除。
- **言語サイドバー**: `LanguageSidebars`（MUI プログレスバー）を Highcharts 割合バーを使う `SkillSidebarComponent` に置き換え。
- **静的 JSON データ**: `src/data/{profile,experience,skills,cow}.json` を削除。プロフィールと職歴データは実行時に GitHub API から取得。
- **モックデータ**: `src/mockData/`（Jest テスト用モック JSON）と Jest テストスイートを削除。
- **`src/pages/` ディレクトリ**: ページコンポーネントを `src/components/features/` に移動。
- **`generate.mjs`**: 一回限りのコード生成スクリプトを削除。
- **`process` ポリフィル**: `buffer`・`path-browserify`・`process`・`stream-browserify` を削除（Vite では不要）。
- **`react-app-rewired` / CRA 設定**: webpack オーバーライド設定を全廃。

---

### 🧪 テスト

| | v1 (main) | v2 |
|---|---|---|
| テストランナー | Jest（CRA 経由） | **Vitest** |
| テストファイル | `.jsx`（`@testing-library/react`） | `@storybook/addon-vitest` 経由の `.stories.tsx` |
| ブラウザテスト | なし | **Playwright**（Chromium） |
| アクセシビリティテスト | なし | `@storybook/addon-a11y` |

- Jest から **Vitest**（happy-dom 環境）に移行
- コンポーネントテストはすべて `play` 関数付きの **Storybook ストーリー** として記述
- ブラウザベースのインタラクションテストは Storybook テストアドオン経由で Playwright が実行

---

### 📦 依存関係の変更

#### 追加

| パッケージ | 用途 |
|---|---|
| `@lingui/core`, `@lingui/react`, `@lingui/cli` | i18n |
| `@octokit/plugin-throttling`, `@octokit/types`, `@octokit/openapi-types` | GitHub API |
| `@tailwindcss/vite`, `tailwindcss`, `daisyui` | UI スタイリング |
| `styled-components` | GitHub 風コンポーネントのテーマ適用 |
| `dayjs` | 日付フォーマット（`moment` の代替） |
| `dompurify` | Markdown の HTML 出力をサニタイズ |
| `highcharts` | スキルチャートの可視化 |
| `vite`, `@vitejs/plugin-react`, `vite-plugin-svgr`, `vite-tsconfig-paths` | ビルドツール |
| `@biomejs/biome` | Lint + フォーマット |
| `vitest`, `@storybook/*`, `playwright` | テスト |

#### 削除

| パッケージ | 理由 |
|---|---|
| `@mui/material`, `@emotion/react`, `@emotion/styled` | Tailwind + DaisyUI に置き換え |
| `@mui/icons-material` | SVGR アイコンファイルに置き換え |
| `react-scripts`, `react-app-rewired` | Vite に置き換え |
| `c3`, `@types/c3` | Highcharts に置き換え |
| `moment` | dayjs に置き換え |
| `crypto-js` | 不要になったため |
| `buffer`, `process`, `stream-browserify`, `path-browserify` | Vite では Node ポリフィル不要 |
| `@types/jest`, `@testing-library/jest-dom` | Vitest に置き換え |
| `gh-pages`, `yargs` | デプロイツールを削除（v2 で再追加） |

---

### 🔧 環境変数

以下の環境変数は `src/constants/env.ts`（`ENV` 定数）で一元管理され、起動時にバリデーションが実行されます:

| 変数名 | 説明 |
|---|---|
| `VITE_GITHUB_API_CLIENT_ID` | GitHub OAuth App クライアント ID |
| `VITE_GITHUB_API_REDIRECT_URI` | OAuth コールバック URL |
| `VITE_GITHUB_API_SCOPE` | OAuth スコープ |
| `VITE_API_ENDPOINT` | バックエンドエンドポイント |
| `VITE_REPOSITORY_OWNER` | 表示対象リポジトリのオーナー（ハードコードを廃止） |
| `VITE_REPOSITORY_NAME` | 表示対象リポジトリ名（ハードコードを廃止） |
| `VITE_CACHE_TTL_MS` | Octokit レスポンスキャッシュの TTL（ミリ秒） |

---

[v2.0.0]: https://github.com/hunyao/Jun-Kumokawa/compare/main...feature/v2
