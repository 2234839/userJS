import $ from "./util";
import config from "./config";

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

    /** 存储鼠标所在位置的所有元素 */
    let path:HTMLElement[];
    /** 监听鼠标移动 */
    function mouse(event:Event) {
        if (event.target instanceof HTMLElement) {
            path = nodePath(event.target);
            outline(event.target);
        }
    }
    if(config.elemtEdit){
        document.addEventListener('mouseover', mouse);
    }

    //监测按键事件
    document.addEventListener('keydown', function (event) {
        var code = event.code;
        if (code === 'F2') {
            config.elemtEdit = !config.elemtEdit;
            console.log('切换编辑状态', config.elemtEdit );
            if (config.elemtEdit) //不处于编辑状态则移除鼠标监听事件，降低性能的消耗
                document.addEventListener('mouseover', mouse);
            else
                document.removeEventListener("mouseover", mouse);
            event.preventDefault();
            event.returnValue = false;
            return false;
        }
        //有元素获得焦点，视为正在输入文本，不执行下面的功能
        if (document.querySelectorAll(":focus").length > 0) {
            return;
        }
        switch (code) {
            case 'KeyQ':
                editSelect(path[0]);
                break;
            case 'KeyD':
                console.log(new deleteSelect(path[0]));

                break;
            case 'KeyC':
                $.copyTitle(path[0])
                if(event.ctrlKey===false)//因为ctrl+c不应该被阻止
                    break
            case "KeyW":
                path[0].contentEditable = 'false';
                break;
            default:
                return true;
        }
    });

    /** 元素失去焦点 */
    document.addEventListener('focusout',function(){
        console.log(event.target);

    })

    /** 设置元素可编辑并获取 逐级向上获取titile*/
    function editSelect(selectElem:HTMLElement) {
        selectElem.contentEditable = 'true';
        $.copyTitle(selectElem)
    }


    /** 轮廓线,用以显示当前元素 */
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
        }, 400);
    }
    /** 获取一个元素的所有父节点到html为止 */
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
*                           按下 w 设置元素为不可编辑
*                           按下 d 就会删除该元素
*                           按下 c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）
* 注意！在元素获得焦点（一般是你在输入文本的时候）的情况下，上面这些按键将进行正常的输入
* 对本地打开的网页的修改 需要在浏览器中设置允许插件在文件地址上运行

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