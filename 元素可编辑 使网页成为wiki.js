// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      0.15
// @description  所见即所得！
// @author       You
// @match        *
// @include        *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //对本地打开的网页的修改貌似无法保存......

    //获取鼠标位置
    var path;
    document.addEventListener('mousemove', (event) => {
        path = event.path;
    });

    //监测 alt+?事件
    document.addEventListener('keydown', (event) => {
        if (!event.altKey)
            return;
        switch (event.key) {
            case "q": editSelect()
                break;
            case "Backspace": deleteSelect()
                break;
            case "c": copyTitle()
                break;
        }
    });
    /**
     * 设置元素可编辑并获取 逐级向上获取titile
     */
    function editSelect() {
        var selectElem = path[0]
        selectElem.setAttribute("contenteditable", "true");
        copyTitle()
    }

    const div=document.createElement('div');
    div.style.display="none";
    /**
     * 移除选中的元素 不使用remove 是因为这个方法并没有真正删除
     */
    function deleteSelect() {
        div.appendChild(path[0]);
        div.innerHTML=""
    }
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('readonly', 'readonly');
    document.body.appendChild(input);
     /**
     * 设置一个影藏的文本框用来复制文本
     */
    function copyTitle() {
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
})();

//完善了删除元素的功能
// #使网页可编辑
// *将鼠标移动到你要修改的文本上方 按下 alt+q 就会将该元素设为可编辑
// *                               按下 alt+ Backspace （删除键） 就会删除该元素，如果失败请尝试移动一下鼠标
// *                               按下 alt+c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）
// *程序会将该元素设置为可编辑,并且复制它的title到剪贴板中.
// ##为什么要开发这样一个插件?
// *这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
// *突然察觉我为什么要多此一举?
// *直接在网页中写笔记不好吗
// *所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这写改动永久保存在本地
// *建议允许插件在文件地址上运行