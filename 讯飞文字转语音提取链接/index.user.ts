// ==UserScript==
// @name         讯飞文字转语音提取链接
// @namespace    https://shenzilong.cn.net/
// @version      1.0
// @description  用于讯飞文字转语音（https://www.ffkuaidu.com/）直接下载
// @author       崮生 2234839456@qq.com
// @match        https://www.ffkuaidu.com/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
console.log("[a]", 3);

export async function main() {
  const a = document.createElement("a");
  a.textContent = "点我下载";
  a.style.width = "150px";
  a.setAttribute("title", "先点击播放按钮生成音频");
  const save_box = document.querySelector(".save_box");
  save_box.insertBefore(a, save_box.firstChild);
  a.addEventListener("click", () => {
    const url = document.querySelectorAll("audio")[2].src;
    alert(url);

    GM.xmlHttpRequest({
      method: "GET",
      url: url,
      onload: function (response: any) {
        response.responseType = "blob";
        console.log("[response]", response);
      },
    });
  });
}
main();
