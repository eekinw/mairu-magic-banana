# README (ひとりマジカルバナナ)

# 実行の仕方

# 依存関係のインストール
- `npm install`

# envにGemini APIキーを設定
GEMINI_API_KEY=your_api_key_here

# 開発サーバーの起動
- `npm run dev`
- 👉 [http://localhost:3000](http://localhost:3000)にアクセスしてゲームを開始できます。
- ビルドの確認: `npm run build` でビルドエラーがないかチェックできます。


## 技術スタック

- **Frontend**: Next.js, Tailwind, Typescript, React Flow Library
- **状態管理**: Redux Toolkit
- **AI　連携**: Google Gemini API


# 実装の方針や工夫した点

1. 自分の開発プロセス
- ネットでゲームのやり方、ワイヤーフレームを理解
- プロジェクト作成と必要なライブラリのインストール
- 基本的なUI実装
- Gemini AIのServer Actions実装
- React Flowを使用したノードの実装
- Redux Toolkit状態管理の実装
- UIの最終調整、確認


2. 技術的な工夫
- Redux Toolkitを使用した効率的、操作しやすい状態管理。最初はReactのuseState, useEffectの使用が多過ぎて、Reduxへの切り替えを決めました。
- ノードの動作をスムーズに実装
- モジュール化された　（Modularity）ファイル・コンポーネント構造で関心事を分離
- React Flowのコンポーネントを活用して単語候補表示を実装 (最初はShadcn UIのポップオーバーを使用したが、ノードとの連携が複雑だった)
- Gemini APIコール失敗時のエラー対応 (Edge Case)
![](/public/geminiError.png)
- コミット前のHuskyチェックで品質を確保


3. ユーザー体験の向上
- 簡潔、スムーズなUI
- Lottieアニメーションによるエンゲージメント向上
- 入力する時のバリデーション（日本語のみ、文字数制限など）
![](/public/onlynihongo.png)
![](/public/minword.png)

# 遊び方ガイド

- ノードをドラッグして位置を変更できます
- 背景をつかんで動かすと、すべてのノードを一緒に移動できます
- マウスでZoom In, Zoom Outが可能です
- ヘッダーをクリックすると、ゲームを最初からやり直せます
- こちらのショート動画もご覧ください: [デモ動画](https://youtu.be/your-video-id)


# 今後の改善点

- Playwrightによるテスト実装
- ゲーム開始前の説明モーダル
- React Flowの他のコンポーネントの活用