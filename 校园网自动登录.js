// ==UserScript==
// @name         校园网自动登录
// @namespace    http://172.17.1.2/
// @version      2025-09-02
// @description  try to take over the world!
// @author       locher
// @match        http://172.17.1.2/srun_portal_pc?ac_id=1&theme=pro
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.2
// @grant        none
// ==/UserScript==

(function autoLogin() {
    // 设置学号
    document.getElementById("username").value = "your_student_id";

    // 设置密码
    document.getElementById("password").value = "your_password";

    // 选择“电信校园宽带” (@ctcc)
    const domainSelect = document.getElementById("domain");
    for (let i = 0; i < domainSelect.options.length; i++) {
        if (domainSelect.options[i].value === "@ctcc") {
            domainSelect.selectedIndex = i;
            break;
        }
    }

    // 触发 change 事件（如果网站有监听）
    domainSelect.dispatchEvent(new Event('change', { bubbles: true }));

    // 勾选“我已阅读并同意使用协议”
    const protocolCheckbox = document.getElementById("protocol");
    if (protocolCheckbox) {
        protocolCheckbox.checked = true;
        protocolCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // 模拟点击登录按钮
    document.getElementById("login-account").click();

    console.log("✅ 已自动填写并提交登录信息（包括同意协议）");
})();