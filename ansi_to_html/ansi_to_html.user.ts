import { default as AnsiUp } from "ansi_up";
import fs from "fs";
const ansi_up = new AnsiUp();

// ==UserScript==
// @name         ansi-to-html
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  将ansi码转为html美化输出 默认不在任何网站执行，需要自行配置在指定网站执行，目前支持 jenkins,需要支持其他类型网站可以像我发邮件
// @author       崮生 2234839456@qq.com
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
var css = fs.readFileSync("./ansi_to_html/ansi_to_html.css",'utf-8'); // <-- The css reader
var style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
(async function () {
  const btn = document.createElement("button");
  btn.textContent = "美化输出";
  btn.classList.add("llej_userjs_ansi-btn");
  document.body.appendChild(btn);
  btn.addEventListener("click", function () {
    Array.from(document.querySelectorAll(".console-output")).forEach((el) => {
      const html = ansi_up.ansi_to_html(el.innerHTML);
      el.classList.add("llej_userjs_ansi-pre");
      el.innerHTML = html;
    });
  });
})();
