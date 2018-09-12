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

(function() {
    'use strict';
    //获取鼠标位置
    //终极目标应该是无论什么只要在网页中打开就都能修改
    var path;
    document.addEventListener('mousemove', (event) => {
        path = event.path;
    });

    //监测 alt+q 事件
    document.addEventListener('keydown', (event) => {
        if (!event.altKey)
            return;
        switch (event.key) {
            case "q": editSelect()
                break;
            case "Backspace": deleteSelect()
                break;
        }
    });

    function editSelect() {
        var selectElem = path[0]
        selectElem.setAttribute("contenteditable", "true");
        copyTitle()
    }
    //这个功能还不够完善 不能被保存....
    //有个想法  将他们移动到一个容器中 然后将这个容器的innerhtml删掉
    function deleteSelect() {
        path[0].parentNode.removeChild(path[0]);
    }
    //设置一个影藏的文本框用来复制文本
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('readonly', 'readonly');
    document.body.appendChild(input);
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

//修改了选择文本的方法，增加了删除元素的功能
// #使网页可编辑
// *将鼠标移动到你要修改的文本上方 按下 alt+q 就会将该元素设为可编辑
// *                               按下 alt+ Backspace （删除键） 就会删除该元素，如果失败请尝试移动一下鼠标
// *程序会将该元素设置为可编辑,并且复制它的title到剪贴板中.
// ##为什么要开发这样一个插件?
// *这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
// *突然察觉我为什么要多此一举?
// *直接在网页中写笔记不好吗
// *所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这写改动永久保存在本地
// *建议允许插件在文件地址上运行