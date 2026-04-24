// ==UserScript==
// @name         校园网自动登录
// @namespace    http://172.17.1.2/
// @version      2025-09-02
// @description  自动填写并点击登录
// @author       locher
// @match        http://172.17.1.2/*
// @match        https://172.17.1.2/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

      // 设置学号
    const id = "your_student_id";

    // 设置密码
    const password = "your_password";

    // 设置运营商，选填：移动、电信、联通、带宽
    let isp = '电信';

    let isp_code;
    switch (isp) {
        case '移动':
            isp_code = '@cmcc';
            break;
        case '电信':
            isp_code = '@ctcc';
            break;
        case '联通':
            isp_code = '@cucc';
            break;
        case '带宽':
            isp_code = '@jxnu';
            break;
    }



  function doLogin() {
    const userField = document.getElementById("username");
    const pwField = document.getElementById("password");
    const loginBtn = document.getElementById("login-account");
    const domainSelect = document.getElementById("domain");
    const protocolCheckbox = document.getElementById("protocol");

    if (!userField || !pwField || !loginBtn) {
      console.log("未找到登录表单元素，退出。");
      return;
    }

    // 1. 设置账号密码
    userField.value = id;

    pwField.value = password;

    // 2. 设置运营商
    if (domainSelect) {
      domainSelect.value = isp_code;
    }

    // 3. 勾选协议
    protocolCheckbox.checked = true;

    loginBtn.click();
  }

  // 等待页面加载完毕后执行
  window.addEventListener("load", () => {
    setTimeout(doLogin, 500);
  });
})();
