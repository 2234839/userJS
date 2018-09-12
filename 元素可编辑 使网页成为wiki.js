// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      0.13
// @description  所见即所得！
// @author       You
// @match        *
// @include        *
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    //获取鼠标位置
    var path;
    document.addEventListener('mousemove', (event) => {
        path =event.path;
    });

    //监测 alt+q 事件
    document.addEventListener('keydown', (event) => {
        if (!event.altKey)
            return;
        switch (event.key) {
            case "q":editSelect()
                break;
            case "Backspace":deleteSelect()
                break;
        }
    });
    //设置一个影藏的文本框用来复制文本
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('readonly', 'readonly');
    document.body.appendChild(input);
    function editSelect() {
        var selectElem = path[0]
        selectElem.setAttribute("contenteditable", "true");
        //获取元素的描述并将他们添加到剪贴板  目前支持mdn 其它的可能支持
        var title
        //这里抛弃后两个元素是因为他们不是一般的elem元素了
        for (let index = 0; index < path.length - 2; index++) {
            title = path[index].getAttribute("title");
            if (title)
                break
        }
        input.setAttribute('value', title);
        input.select();
        document.execCommand('copy');//复制
    }
    function deleteSelect(){
        path[0].parentNode.removeChild(path[0]);  
    }
})();