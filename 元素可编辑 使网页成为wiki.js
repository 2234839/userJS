// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *
// @include        *
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    //禁用页面后退
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('readonly', 'readonly');
    document.body.appendChild(input);
    document.addEventListener('mousedown', (event) => {
        if (event.button != 3)//鼠标侧后键  这样比较不容易触发其他事件,他本身的功能是前进
            return
        event.path[0].setAttribute("contenteditable", "true");
        //获取元素的描述并将他们添加到剪贴板  目前仅支持mdn
        var title
        for (let index = 0; index < event.path.length; index++) {
            title = event.path[index].getAttribute("title");
            if (title)
                break
        }
        console.log(title)
        input.setAttribute('value', title);
        input.select();
        document.execCommand('copy');//复制
    });
})();