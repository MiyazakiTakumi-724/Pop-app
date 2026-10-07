# Pop API仕様

最終更新：2026-10-08

フロント（JavaScript）とバックエンド（Spring Boot）の取り決め。**変更するときは、二人で合意してからこのファイルを更新する。**

## 共通ルール
- ベースURL：開発中は `http://localhost:8080/api`、本番は `/api`
- 形式：JSON（投稿のみ `multipart/form-data`）。項目名は **camelCase**
- 日時：ISO 8601・UTC（例 `2026-10-06T10:00:00Z`）。「12分前」への変換はフロントで行う
- 認証なし（匿名投稿）
- 未入力の任意項目：文字列は `""`、配列は `[]`（`null`にしない）
- タグの整形（サーバー・フロント共通）：前後の空白と先頭の `#` を除く／空は無視／重複は1つにまとめる（最初の順番を残す）

## エンドポイント

### GET /api/pops　一覧
`GET /api/pops?tag=食べ物&tag=コンビニ&page=0&size=20`

| パラメータ | 内容 |
|---|---|
| tag | 絞り込むタグ。複数指定でき、**すべて付いたポップだけ**を返す（完全一致）。省略すると全件 |
| page | ページ番号（0始まり）。既定0 |
| size | 1ページの件数。既定20、最大50 |

```json
{
  "items": [
    {
      "id": 12,
      "title": "セブンの新作カヌレ、想像の3倍うまい",
      "thumbnailUrl": "https://res.cloudinary.com/xxx/image/upload/abc.jpg",
      "imageCount": 3,
      "tags": ["食べ物", "スイーツ", "コンビニ", "セブン"],
      "createdAt": "2026-10-06T10:00:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "hasNext": true
}
```
- 新着順（`createdAt`の降順、同じなら`id`の降順）
- 本文・住所・2枚目以降の画像は含めない。`thumbnailUrl`は1枚目、`imageCount`は画像の総枚数、`hasNext`は次のページの有無
- 該当なし・存在しないタグでも、エラーにせず `items` を空配列で返す
- タグは日本語なので、フロントは`URLSearchParams`でエンコードする

### GET /api/pops/{id}　詳細
```json
{
  "id": 12,
  "title": "セブンの新作カヌレ、想像の3倍うまい",
  "content": "外側はカリッと、中はもっちり。\n買ってから時間が経つと食感が落ちる。",
  "address": "",
  "tags": ["食べ物", "スイーツ", "コンビニ", "セブン"],
  "imageUrls": [
    "https://res.cloudinary.com/xxx/image/upload/abc.jpg",
    "https://res.cloudinary.com/xxx/image/upload/ghi.jpg"
  ],
  "createdAt": "2026-10-06T10:00:00Z"
}
```
- `imageUrls`は表示順（先頭が1枚目で、一覧の`thumbnailUrl`と同じ）
- 本文の改行は`\n`。画面側で`white-space: pre-wrap`などで反映する
- 存在しないIDは `404`

### POST /api/pops　投稿
`multipart/form-data` で送る（フロントは`FormData`）。

| 項目 | 必須 | 制限 |
|---|---|---|
| title | ○ | 1〜50文字 |
| content | | 2000文字まで |
| address | | 200文字まで |
| tags | | 個数の制限なし。1つ20文字まで。**同じ名前で複数回送る** |
| images | ○ | 1〜4枚、1枚5MBまで、JPEG / PNG / WebP。**同じ名前で複数回送る。送った順が表示順** |

```javascript
const formData = new FormData();
formData.append("title", title);
formData.append("content", content);
formData.append("address", address);
tags.forEach((tag) => formData.append("tags", tag));
files.forEach((file) => formData.append("images", file));
fetch(API_BASE + "/pops", { method: "POST", body: formData }); // Content-Typeは指定しない
```
- 成功：`201 Created`。詳細取得と同じ形のJSONを返す
- 失敗：入力が制限に反する・画像以外のファイル→`400`、画像が大きすぎる→`413`

### GET /api/tags　よく使われているタグ
`GET /api/tags?limit=20`（`limit`は既定20、最大50）。投稿フォームのタグ候補に使う。

```json
{ "items": [{ "name": "食べ物", "count": 42 }, { "name": "場所", "count": 18 }] }
```
- `count`はそのタグが付いたポップの数。多い順、同じならタグ名の順
- 1件のポップにも付いていないタグは返さない

## エラー形式
Spring Bootの標準（ProblemDetail）。`detail`は画面にそのまま出せる日本語の文章にする。

```json
{ "type": "about:blank", "title": "Bad Request", "status": 400, "detail": "タイトルは必須です", "instance": "/api/pops" }
```

## 実装メモ
**フロント**
- ベースURLは1か所の定数にまとめる。Live Server（5500番）で開いているときは `http://localhost:8080/api`、それ以外は `/api`
- バックエンドが未完成の間は、このファイルのレスポンス例をダミーデータにする
- 画像の枚数・サイズ・形式は、送信前にフロントでもチェックする

**バックエンド**
- アップロード上限は既定で1ファイル1MB。`spring.servlet.multipart.max-file-size=5MB` と `max-request-size=25MB` に引き上げる
- 開発中は `http://127.0.0.1:5500` と `http://localhost:5500` からのアクセスをCORSで許可する
- 一覧は`Page`をそのまま返さず、上の形に詰め替える
- `tags`が1つも送られないと`null`になることがある。空のリストとして扱う
