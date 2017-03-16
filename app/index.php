<?php
/*
Copyright 2015 NIFTY Corporation All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
  メールに記載されるURLは以下のような形式となっています。
    http://{設定済独自ドメインURL}?link={mBaasAPI名}&version={APIバージョン}
      &applicationId={アプリケーションID}&token={ワンタイムトークン}
  正しくないAPI名でのリクエスト、正しくないパラメータでのリクエストはエラーページへリダイレクトされます。
*/

if (isset($_GET['link']) && isset($_GET['version']) && isset($_GET['applicationId']) && isset($_GET['token'])) {
  // クエリの生成
  $link = htmlspecialchars($_GET['link']);
  $application_id = htmlspecialchars($_GET['applicationId']);
  $api_version = htmlspecialchars($_GET['version']);
  $token = htmlspecialchars($_GET['token']);
  $query = "?applicationId=".$application_id."&token=".$token."&version=".$api_version;

  /*
    linkパラメータとして与えられるAPI名に応じて該当ページにリダイレクトします。
    リダイレクト先URLは以下のような形式となっています。
      http://{設定済独自ドメインURL}/{配置済登録ページ}
        ?applicationId={アプリケーションID}&token={ワンタイムトークン}&version={APIバージョン}

    配置済登録ページは以下のように指定します。
      header('Location: {配置済登録ページURL}'.$param, true, 303);
    当ファイルはテンプレート準拠となっていますので、ページのURLを変更する際はリダイレクト先URLも併せて変更してください。
  */
  switch ($link) {
    case "requestMailAddressUserEntry":
      //メールアドレス登録画面へリダイレクト
      header('Location: mailAddressUserEntry/index.html'.$query, true, 303);
      exit;
    case "requestPasswordReset":
      //パスワード変更画面へリダイレクト
      header('Location: passwordModify/index.html'.$query, true, 303);
      exit;
    case "mailAddressConfirm":
      //ニフティクラウド mobile backendのメールアドレス確認完了処理APIをコール
      header('Location: https://mb.api.cloud.nifty.com/'.$api_version.'/applications/'.$application_id.'/mailAddressConfirm?token='.$token, true, 303);
      exit;
    default:
      //エラー画面へリダイレクト
      header('Location: invalidLink/index.html', true, 303);
      exit;
  }
} else {
  // エラー画面へリダイレクト
  header('Location: invalidLink/index.html', true, 303);
  exit;
}
?>
