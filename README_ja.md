# Jun-Kumokawa

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://jun-kumokawa.mit-license.org/)
[![13 years experience](https://img.shields.io/badge/experience-13%20years-green)](https://portfolio.kumoti.jp)
[![Remote Ready](https://img.shields.io/badge/remote-ready-blue)](https://portfolio.kumoti.jp)
[![Full-Stack](https://img.shields.io/badge/type-full--stack-orange)](https://portfolio.kumoti.jp)

> サービスとしてのフルスタックエンジニア

Jun-Kumokawa は、Webシステム開発のための「人間ライブラリ」です。

* **効率性:** ムダな作業をなくし、自動化スクリプトを作成
* **信頼性:** 十分なテストカバレッジを含む品質重視のコードを提供
* **適応力:** 新しい技術やフレームワークを素早く習得
* **コード品質:** 技術的負債の削減とコーディング標準の整備を推進

## 目次

- [インストール](#インストール)
- [クイックスタート](#クイックスタート)
- [API リファレンス](#api-リファレンス)
- [ユースケース](#ユースケース)
- [実績](#実績)
- [スキル](#スキル)
- [経験](#経験)
- [ライセンス](#ライセンス)

## インストール

注: 以下のコマンドはジョークとして記載した架空のものです。

npm:
```bash
npm install jun-kumokawa --save
```

yarn:
```bash
yarn add jun-kumokawa
```

## クイックスタート

注: 以下のコードはジョーク例です。このリポジトリは実際のパッケージではなく、ポートフォリオサイトです。

採用する場合のサンプル:
```typescript
import JunKumokawa from 'jun-kumokawa';

const engineer = new JunKumokawa({
  role: 'Full-Stack Engineer',
  mode: 'remote',
  location: 'Fukuoka, Japan',
  availability: 'April 2025',
  expectedSalary: {
    monthly: 850000,  // JPY
    currency: 'JPY',
    negotiable: true
  },
  workingHours: {
    timezone: 'Asia/Tokyo (GMT+9)',
    flexibleHours: true
  },
  languages: ['Japanese (Native)', 'English (B2)']
});

// Check availability
console.log(engineer.isAvailable());
// => true

// Get contact info
const contact = engineer.hire();
console.log(contact);
// => {
//   available: 'April 2025',
//   remote: true,
//   expectedSalary: { monthly: 850000, currency: 'JPY' },
//   contact: 'jun@kumokawa.dev',
//   portfolio: 'https://portfolio.kumoti.jp'
// }
```

## API リファレンス

注: 以下の API はジョーク用の架空仕様です。

### コンストラクタオプション
```typescript
interface JunKumokawaOptions {
  role?: string;                    // Default: 'Full-Stack Engineer'
  mode?: 'remote' | 'hybrid';       // Default: 'remote'
  location?: string;                // Default: 'Fukuoka, Japan'
  availability?: string;            // Default: 'April 2025'
  expectedSalary?: {
    monthly?: number;               // Monthly salary expectation
    currency?: string;              // Currency (JPY, USD, etc.)
    negotiable?: boolean;           // Whether negotiable
  };
  workingHours?: {
    timezone?: string;              // Timezone
    flexibleHours?: boolean;        // Flexible working hours
  };
  languages?: string[];             // Languages spoken
}
```

### メソッド

#### `isAvailable(): boolean`

現在採用可能かどうかを返します。

**例:**
```typescript
const isAvailable = engineer.isAvailable();
console.log(isAvailable); // => true
```

#### `getSkills(): Skills`

スキル情報の詳細を返します。

**例:**
```typescript
const skills = engineer.getSkills();
console.log(skills.frontend); // => ['React', 'Vue', 'TypeScript', ...]
```

#### `getExperience(): Experience[]`

職務経歴を返します。

#### `hire(): Contact`

採用時の連絡先情報を返します。

**例:**
```typescript
const contact = engineer.hire();
console.log(contact.email); // => 'jun@kumokawa.dev'
```

## ユースケース

Jun-Kumokawa は、次のような場面で効果を発揮します。

### ユースケース 1: レガシーシステムのモダナイズ

**課題:**
技術的負債が蓄積した既存システムで、次が必要な場合:
- 既存コードの分析と課題特定
- 本番影響を抑えた段階的リファクタリング
- コーディング標準・ベストプラクティス整備
- テスト導入
- パフォーマンス改善

**Jun-Kumokawa が合う理由:**
- 多様なレガシーコードベース対応の 13 年実績
- パフォーマンス改善と不具合削減の実績
- 単独でも小規模チームリードでも対応可能
- 技術的負債を体系的に削減

**実例:**
- 不動産 CRM: パフォーマンス改善、コーディング標準整備、包括的テストカバレッジ達成

---

### ユースケース 2: 高速プロトタイピング / MVP 開発

**課題:**
スタートアップで市場検証のために素早く MVP を作りたい:
- 0 → 1 のプロダクト開発
- フロント + バックエンド + インフラを通した開発
- ユーザーフィードバックに基づく高速改善
- 単独または少人数体制

**Jun-Kumokawa が合う理由:**
- スタック全体を単独で担当可能
- 新技術のキャッチアップが速い
- 7 か月でゼロから構築した実績
- 本質を優先する実務的な進め方

**実例:**
- 自動車部品 EC: 要件定義から本番まで単独で 7 か月
- 複数 API 連携、多言語対応、AWS デプロイ

---

### ユースケース 3: コード品質改善とチーム生産性向上

**課題:**
チームが次の問題を抱えている場合:
- コード品質のばらつき
- バグ・リグレッションの多発
- レビューの停滞
- 生産性の低下

**Jun-Kumokawa が合う理由:**
- 混沌としたコードベースで標準を作った経験
- レビューを通じたジュニア育成が可能
- 自動化ツールで開発効率を改善
- 品質とスピードを両立する現実的判断

**実績例:**
- コーディング標準をゼロから整備
- レビュー体制を改善
- 自動化スクリプト作成（ダミーデータ生成など）
- ジュニアを早期戦力化

---

### ユースケース 4: リモート前提のフルスタック開発

**課題:**
フルリモート組織で、次を満たす人材が必要:
- 細かな管理なしで自走できる
- 非同期コミュニケーションに強い
- フルスタック対応
- モダン技術スタック経験

**Jun-Kumokawa が合う理由:**
- 4 年以上のリモート実務経験
- 独学・自走・自己管理型
- 文章コミュニケーションが明確
- 非同期ワークフローに適応
- タイムゾーン: Asia/Tokyo (GMT+9)（US/Europe と重なり可能）

**技術スタック:**
- Frontend: React, Vue, TypeScript
- Backend: Node.js, NestJS, Python
- Infrastructure: AWS, Docker, CI/CD

---

### ユースケース 5: 緊急バグ対応 / 障害対応

**課題:**
本番障害やクリティカルバグの即時対応が必要:
- 迅速な切り分け
- 未知のコードベースへの即応
- 他機能を壊さない最小影響修正

**Jun-Kumokawa が合う理由:**
- 1日で 10 件以上のバグ修正実績
- 初見コードの把握が速い
- 体系的なデバッグ手法
- プレッシャー下でも対応可能

**実例:**
- 数日見積もりの本番バグ 10 件超を 1 日で解消

---

### ユースケース 6: フリーランス / 業務委託開発

**課題:**
信頼できる業務委託を探している:
- 3〜6 か月程度の有期案件
- 週次工数の柔軟な調整
- 長期雇用前提なし

**Jun-Kumokawa が合う理由:**
- 4 年以上のフリーランス経験
- 安定したプロ意識と責任感
- 期待値調整とコミュニケーションが明確
- すぐに稼働可能（2025年4月〜）

**契約形態:**
- フルタイム契約（160h/月）
- パートタイム契約（80-120h/月）
- プロジェクト単位（固定スコープ）

## 実績

### 実際のインパクト

**🎯 緊急対応**
> 「開発チーム全体が 10 件以上の重大バグで停止。解決見込みは数日。実際は 1 日で全修正し、リリース進行を再開。」

**⚡ システム性能改善**
> 「深刻な性能問題を抱える CRM を引き継ぎ。分析とリファクタリング後、体感速度が改善。クライアントは契約継続を決定。」

**🏗️ 単独フルスタック開発**
> 「EC プラットフォームを 7 か月でゼロから構築。外部 API 連携、多言語対応、AWS 基盤構築、本番リリースまでを単独で完遂。」

**📈 コード品質の変革**
> 「テストゼロ・標準なしのプロジェクトに参画。ガイドラインとテスト運用を導入し、包括的カバレッジを達成。生産性が上がり、バグ報告が減少。」

**👨‍🏫 チーム育成**
> 「レビューとペアプロでジュニアを育成。戦力化が進み、シニア負荷を軽減し、チーム速度を向上。」

### 数字で見る実績

- **実務経験:** 13年
- **担当プロジェクト:** 20件以上
- **経験業界:** 7業界以上（ゲーム、ヘルスケア、不動産、エネルギー、農業、金融、自動車）
- **顧客満足度:** 100%（全案件が継続・延長）
- **納期遵守:** 一貫して高い達成率
- **単独開発:** 0 → 1 のシステムを複数完遂

## スキル

### フロントエンド
```
React      ████████████  13 years
TypeScript ████████░░░░   2 years
Vue.js     ████░░░░░░░░   2 years
HTML/CSS   ████████████  13 years
```

### バックエンド
```
Node.js    ██████░░░░░░   3 years
NestJS     ████░░░░░░░░   1 year
PHP        ████████████   6.5 years
Python     ████░░░░░░░░   1 year
```

### インフラ / DevOps
```
AWS        ████████░░░░   4 years
Docker     ██████░░░░░░   3 years
CI/CD      ████████░░░░   4 years
```

### データベース
```
MySQL       ██████░░░░░░   6 years
PostgreSQL  ██████░░░░░░   3.5 years
Oracle      ████░░░░░░░░   1 year
```

### 得意領域
- ⚡ コード品質改善・リファクタリング
- 🔧 技術的負債の削減
- 📈 チーム生産性の向上
- 🤖 プロセス自動化
- 👨‍🏫 ジュニア育成

## 経験

### 直近プロジェクト

**2024/08 - Present: 不動産 CRM システム**
- Role: Full-Stack Engineer (Contract)
- Stack: React, TypeScript, NestJS, MySQL
- Achievements:
  - コーディング標準をゼロから整備
  - ページ表示性能を大幅改善
  - 包括的テストカバレッジを達成
  - 不具合報告を大きく削減
  - ジュニア開発者を育成

**2024/08 - 2025/02: 自動車部品 EC プラットフォーム**
- Role: Solo Full-Stack Engineer (Contract)
- Stack: React, Express.js, PostgreSQL, AWS
- Achievements:
  - システム全体を 0 → 1 で構築
  - 外部 API（楽天、Yahoo、メルカリ）連携
  - 多言語対応（JP/EN/MN）
  - AWS + CI/CD を構築
  - 7 か月で要件定義から本番まで完了

**2023/12 - 2024/06: 農業データプラットフォーム**
- Role: Frontend Engineer (Contract)
- Stack: Vue3, Quasar, Python, Django, Oracle
- Achievements:
  - SSO 認証を実装
  - Vue3 + Quasar でフロント UI を開発
  - 大量データ取込用ストアド手続きを作成

### キャリアサマリ

**2012 - Present: 実務経験 13 年**

経験業界:
- 🎮 ゲーム
- 🏥 ヘルスケア
- 🏢 不動産
- ⚡ エネルギー
- 🌾 農業
- 💰 金融
- 🚗 自動車

総案件数: 20件以上

📄 [職務経歴を見る](./EXPERIENCE.md) | 📊 [詳細スキルを見る](./SKILLS.md)

## 私について 🤔

日本生まれ・独学のフルスタックエンジニアです。

**Background:**
- 🎓 高校時代にコーディング開始（HTML, CSS, JavaScript, PHP）
- 🖥️ 自宅サーバーを自作（Web, Mail, DNS）
- 📧 自前メールサーバーで独自メールアドレスを運用
- 🌏 言語: 日本語（ネイティブ）, 英語（B2）
- 📍 拠点: 福岡
- 💼 働き方: リモート中心・自己管理

**Philosophy:**
> 「ムダをなくし、自動化し、本質に集中する」

**What Drives Me:**
- 非効率を見つけて解消すること
- 保守しやすいクリーンなコードを書くこと
- チームの生産性を高めること
- 新技術を学ぶこと
- コードで実課題を解決すること

## Jun-Kumokawa を選ぶ理由

✅ **実績が明確**
- 実務 13 年
- 20 件以上の案件経験
- 顧客満足度 100%

✅ **フルスタック対応**
- プロジェクト全体を単独で推進可能
- 複数人材の調整コストを削減

✅ **キャッチアップが速い**
- 新技術への適応が早い
- 未知のコードベースにも即応

✅ **自走力が高い**
- マイクロマネジメント不要
- リモート業務と高相性

✅ **品質重視**
- 技術的負債に継続的に向き合う
- ベストプラクティスを整備
- 保守しやすいコードを実装

✅ **費用対効果**
- 福岡拠点によるコスト優位性
- 東京水準の開発品質を競争力ある単価で提供

## 稼働状況・連絡先

**Current Status:** 2026年7月から稼働可能

**Preferred Engagement:**
- フルタイム契約（160h/月）
- パートタイム契約（80-120h/月）
- プロジェクト単位（固定スコープ）

**Expected Rate:**
- 月額: ¥850,000（応相談）
- フルリモート対応

**Contact:**
- 📧 Email: jun@kumoti.jp
- 🌐 Portfolio: [https://portfolio.kumoti.jp](https://portfolio.kumoti.jp)
- 💼 GitHub: [https://github.com/hunyao](https://github.com/hunyao)

## ライセンス

MIT License - あなたのプロジェクトへの採用は自由です

Copyright (c) 1992-present, Jun Kumokawa

---

**Made with ❤️ and clean code**

信頼できるフルスタックエンジニアを探しているなら、ぜひご連絡ください。
