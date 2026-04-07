// ==UserScript==
// @name         校园网自动登录
// @namespace    http://172.17.1.2/
// @version      2025-09-02
// @description  在脚本中填入自己的账号密码后即可导入油猴使用
// @author       locher
// @match        http://172.17.1.2/*
// @match        https://172.17.1.2/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.2
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

(async function autoLogin() {

    // 填入账户名
    const username = "your_username"
    // 填入密码
    const password = "your_password"
    // 设置运营商，选填：移动、电信、联通、带宽
    let isp = '电信';


    async function isOnline() {
        if (!navigator.onLine) return false;

        // https://172.17.1.3:8080/assets/aaecd1cf/dialogs/attachment/fileTypeImages/icon_pdf.gif

        try {
            const response = await new Promise((resolve) => {
                GM_xmlhttpRequest({
                    method: "HEAD", // 只获取头部，节省流量
                    url: "https://www.baidu.com/?t=" + Date.now(),
                    timeout: 3000,
                    onload: (res) => resolve(res.status >= 200 && res.status < 400),
                    onerror: () => resolve(false),
                    ontimeout: () => resolve(false)
                });
            });
            return response;
        } catch (e) {
            return false;
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function login() {


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


        const domainSelect = document.getElementById("domain");
        for (let i = 0; i < domainSelect.options.length; i++) {
            if (domainSelect.options[i].value === isp_code) {
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

        // 设置学号
        document.getElementById("username").value = username;
        // 设置密码
        document.getElementById("password").value = password;

        // 模拟点击登录按钮
        document.getElementById("login-account").click();

        console.log("✅ 已自动填写并提交登录信息");
    }


    try {
        login();
    } catch (error) {
        console.log("已经登陆，或出现其他错误:", error)
    }


    // Looping...
    while (true) {
        await sleep(2000);
        if (await isOnline()) {
            continue;
        }

        location.reload();
    }


})();
