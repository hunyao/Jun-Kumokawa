# AGENTS.md

このファイルは、このリポジトリで作業するエージェント向けの運用ガイドです。

## プロジェクト概要

- React + Vite + TypeScript で構築されたポートフォリオサイト
- GitHub API は Octokit を利用し、OAuth サインインに対応
- UI は GitHub 風デザイン（Storybook あり）
- PWA 対応（manifest.json・favicon・アイコン画像）

## 主要コマンド

```bash
pnpm dev         # Vite 開発サーバー (http://localhost:3000)
pnpm build       # TypeScript build + Vite build（dist/404.html も生成）
pnpm lint        # Biome lint (src/)
pnpm test        # Vitest (Storybook + Playwright 連携あり)
pnpm test:unit   # Vitest (単体テスト)
pnpm storybook   # Storybook 開発サーバー (:6006)
pnpm deploy      # gh-pages で dist/ を GitHub Pages へデプロイ
```

単一テストの実行:

```bash
pnpm exec src/path/to/file.test.ts
```

## ディレクトリ構造

```
public/
├── images/                  # 公開画像（avatar.jpg、背景など）
├── avatar_192x192.jpg       # PWA アイコン (192px)
├── avatar_512x512.jpg       # PWA アイコン (512px)
├── favicon.ico              # ファビコン
├── manifest.json            # PWA マニフェスト
└── robots.txt               # クローラー制御

src/
├── assets/                  # 画像などの静的ファイル
├── components/
│   ├── common/              # 汎用コンポーネント群
│   │   ├── Activity/
│   │   ├── BlobViewContent/ # ファイル内容表示
│   │   ├── Breadcrumbs/
│   │   ├── CloneCode/       # クローン用コードパネル
│   │   ├── CopyContentButton/
│   │   ├── DirectoryContent/
│   │   ├── DirectoryContentRow/
│   │   ├── DirectoryContentRowSkelton/
│   │   ├── ErrorPanel/
│   │   ├── Footer/
│   │   ├── GoToFile/
│   │   ├── Header/
│   │   ├── LanguageUsage/
│   │   ├── LatestCommit/
│   │   ├── OverviewContent/ # README 表示（index.module.scss でカスタム Markdown スタイル）
│   │   ├── Profile/
│   │   ├── RepositoryFileTree/
│   │   ├── RepositoryFileTreeItem/
│   │   ├── SideBarMenu/
│   │   ├── SkillSidebarComponent/
│   │   ├── SuspenseWithComponent/
│   │   ├── SwitchBranches/
│   │   ├── Timeline/
│   │   ├── Toast/
│   │   ├── TranslateMenu/
│   │   └── index.ts         # 全コンポーネントの再エクスポート
│   ├── features/            # ページ単位の機能コンポーネント
│   │   ├── cow/             # イースターエッグ
│   │   ├── errors/          # エラーページ
│   │   ├── experience/      # 職歴ページ
│   │   ├── repository/      # リポジトリ詳細
│   │   ├── skill/           # スキルページ
│   │   └── tree/            # ファイルツリーページ
│   ├── icons/               # SVG アイコン (.svg, index.ts)
│   ├── layouts/             # ページ共通レイアウト
│   ├── middlewares/         # HOC（OauthCallback など）
│   └── ui/                  # デザインシステムコンポーネント（主にフラット .tsx ファイル）
│       ├── Container/       # (ディレクトリ)
│       ├── DetailBoxTitle.tsx
│       ├── GithubBreadcrumbs.tsx
│       ├── GithubButton.tsx
│       ├── GithubChip.tsx
│       ├── GithubMenuButton.tsx
│       ├── GithubNavMenu.tsx
│       ├── GithubTab.tsx
│       └── index.ts
├── constants/               # 定数定義 (Routes など)
├── contexts/                # React Context (ToastContext)
├── hooks/                   # カスタムフック
├── lib/                     # 外部ライブラリラッパー (octokit, markdownIt, dayjs, lingui)
├── types/                   # 型定義
├── utils/                   # 汎用ユーティリティ関数
├── main.tsx                 # エントリーポイント
└── routes.tsx               # React Router ルート定義
```

## アーキテクチャ

- ルーティング: `src/routes.tsx`（loader 関数でレンダリング前に GitHub データをプリフェッチ）
  - 主要ルート: `/`、`/repo/:owner/:id`、`/tree/:owner/:id`
- ルート定義定数: `src/constants/common.ts` (`Routes`)
- レイアウト: `src/components/layouts/`
- 機能単位ページ: `src/components/features/`
- 共通 UI: `src/components/common/`, `src/components/ui/`
- GitHub 認証ミドルウェア: `src/components/middlewares/OauthCallback.tsx`

### GitHub API / 認証フロー

- Octokit ラッパー: `src/lib/octokit.ts`
- GET リクエストは SHA1 キーでメモリキャッシュ（TTL: `VITE_CACHE_TTL_MS`、`setTimeout` で自動削除）
- 401 発生時は `github-access-token` を消去し、`octokit:unauthorized` イベントを発火
- 認証状態管理: `src/hooks/useGithub.tsx`

### テーマ管理

- DaisyUI テーマを `html[data-theme]` 属性（`"light"` / `"dark"`）で制御
- 初期テーマ: `mainLayout.tsx` の `useEffect` 内で `getDefaultThemeName()` を呼び出して設定
  - `getDefaultThemeName()` — `localStorage["theme"]` を優先し、未設定なら `isDarkMode()` でシステム設定を参照（`src/utils/getDefaultThemeName.ts`）
  - `isDarkMode()` — `window.matchMedia('(prefers-color-scheme: dark)')` を参照（`src/utils/isDarkMode.ts`）
- テーマ切替: `useThemeController.tsx` のチェックボックス change ハンドラー内で `document.documentElement.setAttribute('data-theme', ...)` と `localStorage` を更新
- highlight.js テーマ: `src/index.css` で `html[data-theme="dark"]` セレクター内に `github-dark.css` を @import し、自動切替

### Markdown レンダリング（OverviewContent）

- `src/lib/markdownIt.ts` — markdown-it インスタンス（highlight.js 連携済み）
- `src/lib/markdownItNamedHeadings.ts` — 見出しに id 付与 + 見出し内リンクの href 自動生成
- スタイリング: `src/components/common/OverviewContent/index.module.scss`
  - Tailwind Preflight のリセットを補うカスタム GitHub 風 CSS（テーブルボーダー・リスト・見出しなど）
  - DaisyUI CSS 変数（`--color-base-content` など）を使用してライト/ダーク双方に対応

## Context

- `src/contexts/ToastContext.tsx` — Toast 通知
- `src/contexts/ThemeControlContext.tsx` — テーマ切替チェックボックスへの ref
- `src/contexts/TranslateContext.tsx` — 言語切替

`main.tsx` で Provider をアプリ全体に適用。

## パスエイリアス

`tsconfig.app.json` の `paths` を利用。新規コードは相対 import よりエイリアス import を優先。

| エイリアス | 解決先 |
|---|---|
| `#features/*` | `src/components/features/*` |
| `#components/*` | `src/components/common/*` |
| `#ui/*` | `src/components/ui/*` |
| `#layouts/*` | `src/components/layouts/*` |
| `#middlewares/*` | `src/components/middlewares/*` |
| `#icons/*` | `src/components/icons/*` |
| `#hooks/*` | `src/hooks/*` |
| `#contexts/*` | `src/contexts/*` |
| `#utils/*` | `src/utils/*` |
| `#lib/*` | `src/lib/*` |
| `#constants/*` | `src/constants/*` |
| `#types/*` | `src/types/*` |
| `#errors/*` | `src/errors/index.ts` |

## React 設計方針

React の設計思想に沿ったコーディングを行う:

- **単一責任**: 1 つのコンポーネントは 1 つの役割に集中する。肥大化したら分割を検討する
- **データの流れ**: props は親から子への一方向。子から親への通信はコールバック関数で行う
- **状態の最小化**: state は本当に変化するデータのみ持つ。導出できる値は useMemo / 計算で対応する
- **副作用の局所化**: データ取得・イベント登録などの副作用は useEffect に閉じ込め、カスタムフックに切り出す
- **コンポーネントは純粋に**: 同じ props には同じ出力を返す。レンダリング中の副作用は禁止
- **コンテキストの乱用禁止**: Context はグローバルな状態（Toast など）に限定し、props で渡せるものは props を使う

## コーディング規約

- フォーマット/Lint は Biome (`biome.json`) を使用
- インデント 2 スペース、シングルクオート
- import 整理を維持（Biome organizeImports）
- 未使用の変数/import はエラー
- `React.FC` / `FunctionComponent` は使用禁止
- Tailwind クラス順は Biome ルールに従う

### import 規則

- 相対 import よりパスエイリアスを優先する
- 各エイリアスは必ず `index` 経由でインポートする（直接サブパスを指定しない）

```ts
// ✅ 正しい
import { MyComponent } from '#components/index';
import { useSkill } from '#hooks/index';

// ❌ 禁止
import { MyComponent } from '#components/MyComponent';
import { useSkill } from '#hooks/useSkill';
```

## コンポーネント作成規約

新規コンポーネントは上記ディレクトリ構造に従い、用途に合ったディレクトリ配下に必ずディレクトリ単位で作成する:

- 汎用コンポーネント → `src/components/common/MyComponent/`
- ページ単位の機能コンポーネント → `src/components/features/<機能名>/MyComponent/`
- デザインシステム・GitHub UI の再現など → `src/components/ui/MyComponent/`

GitHub 風 UI パーツ（ボタン、タブ、チップ、メニューなど）は必ず `src/components/ui/` に格納し、他のディレクトリに混在させない。

各ディレクトリには以下を必ず含める:

```
MyComponent/
  index.tsx          # コンポーネント本体
  index.stories.tsx  # Storybook ストーリー
```

- ファイル単体 (`MyComponent.tsx`) での作成は禁止
- `index.stories.tsx` は必ずセットで作成し、主要な表示パターンと `play` 関数によるインタラクションテストを含める
- `src/components/common/` に追加した場合は `src/components/common/index.ts` に `export * from './MyComponent'` を追記する

## テスト方針

- Vitest + happy-dom
- Storybook テストは `@storybook/addon-vitest` 経由で実行
- Browser provider は Playwright (Chromium)

## 環境変数

`.env` で以下を利用（`src/constants/env.ts` の `ENV` 定数で一元管理、起動時に未設定チェックあり）:

- `VITE_GITHUB_API_CLIENT_ID`
- `VITE_GITHUB_API_REDIRECT_URI`
- `VITE_GITHUB_API_SCOPE`
- `VITE_API_ENDPOINT`
- `VITE_REPOSITORY_OWNER` — 表示対象のリポジトリオーナー
- `VITE_REPOSITORY_NAME` — 表示対象のリポジトリ名
- `VITE_CACHE_TTL_MS` — Octokit GET レスポンスのキャッシュ TTL（ミリ秒）

機密情報はコミットしないこと。

## エージェント作業ルール

- 変更前に関連ファイルを読み、既存構造に合わせる
- ファイル変更後は `pnpm lint` で Biome のフォーマッターと Lint を実行する
- 必要に応じて `pnpm test` を実行
- `dist/` は成果物なので原則手編集しない
- 既存の命名・ディレクトリ規約を優先し、不要な新規 abstraction を追加しない
