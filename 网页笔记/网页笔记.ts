import { a } from "./m1";

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      0.17
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(a);

    //对本地打开的网页的修改貌似无法保存......
    //获取鼠标位置
    let path:HTMLElement[];
    document.addEventListener('mouseover', (event) => {
        if(event.target instanceof HTMLElement){
            path = nodePath(event.target);
            outline(event.target)
        }
    });
    //监测 shift+?事件
    document.addEventListener('keydown', (event) => {
        if (!event.ctrlKey)
            return false;
        switch (event.code) {
            case 'KeyQ':
                editSelect()
                break;
            case 'Backspace':
                deleteSelect()
                break;
            case 'KeyC'://c
                copyTitle()//复制title  这里不加break是为了不影响正常的复制行为
            case "KeyW"://w
                console.log("path",path)
                break;
            default:
                return true
        }//屏蔽浏览器对于这些快捷键的响应避免一些奇奇怪怪的操作
        event.preventDefault()
        event.returnValue=false;
        return false;
    });
    /**
     * 设置元素可编辑并获取 逐级向上获取titile
     */
    function editSelect(){
        let selectElem = path[0]
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
        input.setAttribute('value', title as string);
        input.select();
        document.execCommand('copy');//复制
    }
    function outline(elemt:HTMLElement){
        if(elemt.style.outline == "2px solid red")
            return
        elemt.style.outline="2px solid red"
        setTimeout(()=>{
            if(elemt==path[0]){
                outline(elemt)
                return
            }
            elemt.style.outline=""
        },500)
    }
    /**
     * 获取一个元素的所有父节点到html为止
     */
    function nodePath(node:HTMLElement):HTMLElement[]{
        let path:HTMLElement[]=[node]
        while (node.parentElement!=null) {
            node=node.parentElement
            path.push(node)
        }
        return path
    }
})();
/*
# 使网页可编辑
* 将鼠标移动到你要修改的文本上方 按下 ctrl+q 就会将该元素设为可编辑，并且复制它的title到剪贴板中
*                               按下 ctrl+ Backspace （删除键） 就会删除该元素
*                               按下 ctrl+c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）
## 为什么要开发这样一个插件?
* 这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
* 突然察觉我为什么要多此一举?
* 直接在网页中写笔记不好吗
* 所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这些改动永久保存在本地
* 建议允许插件在文件地址上运行
## v0.17 的更新介绍
* 这次主要是修改了逻辑，更加优雅，还有添加了红边框能更清楚的知道到底是再对那个元素进行了操作
*/