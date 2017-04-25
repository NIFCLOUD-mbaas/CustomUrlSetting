/*
Copyright 2017 FUJITSU CLOUD TECHNOLOGIES LIMITED All Rights Reserved.

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

  this.setForm = function( name, value, action, formname ){
    var q = document.createElement('input');
    q.type = 'hidden';
    q.name = name;
    q.value = value;
    if (formname){
      document.forms[formname].checkNewPassword.disabled = true;
      document.forms[formname].appendChild(q);
      document.forms[formname].action = action;
      document.forms[formname].method = "post";
    }
  }

  this.makeFormPath = function( appId, varNo ){
	var baseUrl = Config.BASE_URL + varNo;
    this.path = baseUrl + Config.APPLICATIONS_PATH + appId + Config.API_PATH;

    return this.path;
  }

  this.checkForm = function( ){
    this.temporaryPassword = document.onetimeForm.temporaryPassword.value;
    this.newPassword1 = document.onetimeForm.newPassword.value;
    this.newPassword2 = document.onetimeForm.checkNewPassword.value;

    if (this.isNull(this.temporaryPassword,this.newPassword1, this.newPassword2)){
      alert(Config.ALERT);
      return;
    }

    if (this.isSame(this.newPassword1, this.newPassword2)){
      this.setForm(Config.ONETIME_KEY, this.onetimeToken, this.actionPath, Config.FORM_NAME);
      var form = document.forms[Config.FORM_NAME];
      form.submit();
    } else {
      alert(Config.ALERT_NOT_SAME);
      return;
    }
  }

  this.isNull = function( tmp,new1,new2 ){
    if (tmp && new1 && new2) {return false;}
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
