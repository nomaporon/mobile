# 料理注文システム(モバイルオーダーアプリ)
<details>
<summary>料理注文ページ画像</summary>
    
<img width="316" alt="スクリーンショット 2023-09-27 12 37 07" src="https://github.com/nomaporon/mobile_order/assets/88223569/d3108560-6df3-4704-ae23-73825adb5804">
<img width="316" alt="スクリーンショット 2023-09-27 12 42 00" src="https://github.com/nomaporon/mobile_order/assets/88223569/bd5280ce-9c9e-4484-b840-855a1bdf5a0e">
<img width="315" alt="スクリーンショット 2023-09-27 12 37 43" src="https://github.com/nomaporon/mobile_order/assets/88223569/61bd6c35-1564-477f-95c3-678888e186df">
<img width="316" alt="スクリーンショット 2023-09-27 12 37 48" src="https://github.com/nomaporon/mobile_order/assets/88223569/82f5654c-6eb3-41a1-b3d1-85be436afdd4">
</details>

[料理注文用ページURL(スマホ用)](https://mobileorder-d8e59e5ce573.herokuapp.com/)

<details>
<summary>料理編集ページ画像</summary>

<img width="1433" alt="スクリーンショット 2023-09-27 12 38 13" src="https://github.com/nomaporon/mobile_order/assets/88223569/42fb1be8-ad43-4db7-acd0-24cc1e2e1183">
<img width="1434" alt="スクリーンショット 2023-09-27 12 38 45" src="https://github.com/nomaporon/mobile_order/assets/88223569/344e30de-f17f-4986-8ae6-4f014c0346e7">
</details>

[料理編集用ページURL(PC用)](https://mobileorder-d8e59e5ce573.herokuapp.com/admin)

スマホを使って料理を注文し、会計までできるアプリケーションです。

現在は注文をすべてまとめてしまっているので、今後はテーブルごとに注文を管理し、会計できるようにすることが目標です。

## 制作背景
web技術を用いて様々なことができると思いますが、その中で正確で迅速な情報伝達が大きな特徴だと思っています。最近飲食店で導入が進んでいるモバイルオーダーシステムは、人によるオーダーに比べ「労働力」、「正確な情報伝達」という点でとても優れていると感じており、web技術による恩恵を大きく受けられるところだと感じています。そのような、web技術による恩恵が大きいことに加え技術的にもそう難しくないことから、制作してみようと思いました。

現在、すでに多くのモバイルオーダーシステムが出ているため、いろんなユーザーに広く使ってもらうことは個人の開発ではなかなか難しいと思いますが、まだまだ個人経営のお店などでは導入することで恩恵を得られるところがあると思います。今後は、実際にユーザーに使ってもらえる機能を揃えて、まずは文化祭で自分の出店などで試してみることで、実用化するにあたってどのような問題があるのかも今後体験していきたいと思っています。

## 技術・設計
### 使用言語・フレームワーク
フロントエンド：React
バックエンド：Laravel

### その他の技術
AWS(Cloud9、S3)、heroku

### ワイヤーフレーム
<details>
<summary>ワイヤーフレーム画像</summary>

<img width="1440" alt="スクリーンショット 2023-10-25 12 05 27" src="https://github.com/nomaporon/mobile_order/assets/88223569/0d2361d3-f5ed-4683-b46a-cd561c8ae010">
<img width="1440" alt="スクリーンショット 2023-10-25 12 06 14" src="https://github.com/nomaporon/mobile_order/assets/88223569/3f1e2b22-5afb-4bef-b1cd-0ecbb1ca1e64">
</details>

[FigmaのURL](https://www.figma.com/file/yFY6ILefLyADcdNwDQ1F8T/%E6%B3%A8%E6%96%87%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0?type=design&node-id=1%3A4&mode=design&t=4CEYXk8jy5K9DpWj-1)

### ER図
<details>
<summary>ER図画像</summary>

<img width="954" alt="スクリーンショット 2023-10-25 12 10 39" src="https://github.com/nomaporon/mobile_order/assets/88223569/312831da-e0ec-445f-9438-a8cac0dd07e2">
</details>
