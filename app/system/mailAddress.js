/*
Copyright 2017 - 2018 FUJITSU CLOUD TECHNOLOGIES LIMITED All Rights Reserved.

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

var Set = function(json){

  //リクエストパラメータ取得
  this.getParams = function() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }

  this.setForm = function( action, formname ){

    //ワンタイムトークン
    var q1 = document.createElement('input');
    q1.type = 'hidden';
    q1.name = "NCMBToken";
    q1.value = this.onetimeToken;

    //フォーム設定
    if (formname){
      document.forms[formname].checkPassword.disabled = true;
      document.forms[formname].appendChild(q1);
      document.forms[formname].action = action;
      document.forms[formname].method = "post";
    }
  }

  //URL生成
  this.makeFormPath = function( appId, varNo ){
	var baseUrl = Config.BASE_URL + varNo;
    this.path = baseUrl + Config.APPLICATIONS_PATH + appId + Config.API_PATH_MAIL;

    return this.path;
  }

  //入力チェック
  this.checkForm = function( ){
    this.password1 = document.mailAddressForm.password.value;
    this.password2 = document.mailAddressForm.checkPassword.value;

    //パスワード必須チェック
    if (this.isNull(this.password1, this.password2)){
      alert(Config.ALERT);
      return;
    }

    //パスワードと確認用パスワードとの一致チェック
    if (this.isSame(this.password1, this.password2)){
      //フォーム設定
      this.setForm(this.actionPath, Config.FORM_NAME_MAIL);
      var form = document.forms[Config.FORM_NAME_MAIL];
      //送信
      form.submit();
    } else {
      alert(Config.ALERT_NOT_SAME);
      return;
    }
  }

  this.isNull = function(new1,new2){
    if (new1 && new2) {return false;}
    return true;
  }

  this.isSame = function( text1, text2 ){
    if (text1 === text2) {return true;}
    return false;
  }


  this.params = this.getParams();
  this.onetimeToken = this.params[Config.ONETIME_KEY];
  this.app_id = this.params[Config.APPID_KEY];
  this.var_No = this.params[Config.VERSION_NO];
  this.actionPath = this.makeFormPath(this.app_id, this.var_No);

};
