"use strict";
// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      0.18
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @grant        GM_getValue    //油猴的存储接口
// @grant        GM_setValue
// ==/UserScript==
(function () {
    'use strict';
    //为了在非油猴环境下存储依旧能起一部分的作用
    if (window.hasOwnProperty("GM_getValue") && window.hasOwnProperty("GM_setValue")) {
        localStorage.getItem = (<any>window).GM_getValue;
        localStorage.setItem = (<any>window).GM_setValue;
    }
    //对本地打开的网页的修改 需要在浏览器中设置允许在文件地址上运行

    /** 存储鼠标所在位置的所有元素 */
    let path:HTMLElement[];
    /** 监听鼠标移动 */
    function mouse(event:Event) {
        if (event.target instanceof HTMLElement) {
            path = nodePath(event.target);
            outline(event.target);
        }
    }
    const global = {
        state: 0,
        elemtEdit: false,
    };
    //监测按键事件
    document.addEventListener('keydown', function (event) {
        var code = event.code;
        if (code === 'F2') {
            global.elemtEdit = !global.elemtEdit;
            console.log('切换编辑状态', global.elemtEdit );
            if (global.elemtEdit) //不处于编辑状态则移除鼠标监听事件，降低性能的消耗
                document.addEventListener('mouseover', mouse);
            else
                document.removeEventListener("mouseover", mouse);
            event.preventDefault();
            event.returnValue = false;
            return false;
        }
        //有元素获得焦点，视为正在输入文本，不执行下面的功能
        if (document.querySelectorAll(":focus").length > 0) {
            return true;
        }
        switch (code) {
            case 'KeyQ':
                editSelect();
                break;
            case 'KeyD':
                deleteSelect();
                break;
            case 'KeyC':
                copyTitle(); //复制title  这里不加break是为了不影响正常的复制行为
            case "KeyW":
                console.log("path", path);
                break;
            default:
                return true;
        }
    });
    /** 监听焦点事件，用于判断元素是否被修改 */
    function focus(event:Event) {
        console.log(event);
    }
    document.addEventListener('focus', focus, true); //useCapture  参数设为true来实现事件委托，但不同浏览器的实现可能不同.....
    /** 设置元素可编辑并获取 逐级向上获取titile*/
    function editSelect() {
        var selectElem = path[0];
        selectElem.contentEditable = 'true';
        copyTitle();
    }
    var div = document.createElement('div');
    div.style.display = "none";
    /** 移除选中的元素 不使用remove 是因为这个方法并没有真正删除 */
    function deleteSelect() {
        div.appendChild(path[0]);
        div.innerHTML = "";
    }
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('readonly', 'readonly');
    document.body.appendChild(input);
    /**
    * 设置一个影藏的文本框用来复制文本
    */
    function copyTitle() {
        //获取元素的描述并将他们添加到剪贴板  目前支持mdn 其它的可能支持
        var title;
        //这里抛弃后两个元素是因为他们不是一般的elem元素了
        for (var index = 0; index < path.length - 2; index++) {
            title = path[index].getAttribute("title");
            if (title)
                break;
        }
        input.setAttribute('value', title);
        input.select();
        document.execCommand('copy'); //复制
    }
    function outline(elemt:HTMLElement) {
        if (elemt.style.outline == "2px solid red")
            return;
        elemt.style.outline = "2px solid red";
        setTimeout(function () {
            if (elemt == path[0]) {
                outline(elemt);
                return;
            }
            elemt.style.outline = "";
        }, 500);
    }
    /**
     * 获取一个元素的所有父节点到html为止
     */
    function nodePath(...path:HTMLElement[]) {
        while (path[path.length-1].parentElement != null) {
            path.push(path[path.length - 1].parentElement);
        }
        return path;
    }
})();
/*
# 使网页可编辑
* 按下F2启用元素编辑，再次按下可以关闭
* 将鼠标移动到你要修改的文本上方 按下 q 就会将该元素设为可编辑，并且复制它的title到剪贴板中
*                           按下 d 就会删除该元素
*                           按下 c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）
* 注意！在元素获得焦点（一般是你在输入文本的时候）的情况下，上面这些按键将进行正常的输入

## 为什么要开发这样一个插件?
* 这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
* 突然察觉我为什么要多此一举?
* 直接在网页中写笔记不好吗
* 所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这些改动永久保存在本地
* 建议允许插件在文件地址上运行
* 正在想方法让笔记存在云端

## v0.19 的更新介绍
* 最近得空了，开始更新
* 因为（ctrl + 其他键）的模式 在一些浏览器上还是会出现冲突，故改为F2键来作为开关
* 下一版本将实现便签功能，以及撤销功能
* 正在进行云端存储的后台工作。在不远的将来将实现笔记备份至云端
* 希望各位能将你们想要的功能进行一个反馈
*/