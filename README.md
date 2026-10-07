# Pop

食べ物・商品などのレビューを気軽に投稿できる匿名投稿サイト。
投稿されたレビュー（＝**ポップ**）は、SNSのタイムラインのように新着順で掲示板に並ぶ。

> 現在のステータス：**仕様策定中（実装は未着手）**
> まずは [docs/spec.md](docs/spec.md) を読んでください。

## 技術スタック
| 領域 | 技術 |
|---|---|
| フロントエンド | HTML / CSS / JavaScript（フレームワーク・ビルドツールなし） |
| バックエンド | Java + Spring Boot |
| データベース | PostgreSQL |
| 画像の保存先 | 外部ストレージ（Cloudinary等） |
| デプロイ | Render |

## 役割分担
| 担当 | 範囲 |
|---|---|
| takumi-miyazaki | フロントエンド主担当（一覧・詳細画面、CSS共通ルール） |
| ito-tsubasa | バックエンド全般 ＋ フロントエンドの一部（投稿フォーム） |

詳細は [docs/spec.md](docs/spec.md) の「6. 役割分担」を参照。
API仕様は [docs/api.md](docs/api.md) を参照。

## 現在のフォルダ構成
```
Pop-app/
├── server/src/main/resources/static/   … フロントエンド（Spring Bootが公開する。今は雛形）
├── mockup/index.html                   … 画面構成を確認するためのワイヤーフレーム（ダミーデータ）
└── docs/
    ├── spec.md               … 仕様書
    └── api.md                … API仕様
```

## フロントエンドの動かし方
VS Codeの拡張機能 **Live Server** で、確認したいHTMLを右クリック →「Open with Live Server」。

- 画面を見る場合：`server/src/main/resources/static/index.html` を開く
- モックを見る場合：`mockup/index.html` を開く
- HTMLファイルをダブルクリックで直接開く（`file://`）のは不可。API通信がブロックされるため

## 開発の進め方
- 担当は [docs/spec.md](docs/spec.md) の6章に従う（Issueは使わない）
- Git Flow（簡略版）：`feature/*` を `develop` から切り、`develop` へPR。区切りで `develop` から `main` へPR
- `main` と `develop` へ直接pushしない。相手にレビューしてもらってからマージする
- 詳しくは [docs/spec.md](docs/spec.md) の10章
