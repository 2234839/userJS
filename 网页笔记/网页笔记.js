"use strict";
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
(function () {
    'use strict';
    //对本地打开的网页的修改貌似无法保存......
    //获取鼠标位置
    var path;
    document.addEventListener('mouseover', function (event) {
        if (event.target instanceof HTMLElement) {
            path = nodePath(event.target);
            outline(event.target);
        }
    });
    //监测 shift+?事件
    document.addEventListener('keydown', function (event) {
        if (!event.ctrlKey)
            return false;
        switch (event.code) {
            case 'KeyQ':
                editSelect();
                break;
            case 'Backspace':
                deleteSelect();
                break;
            case 'KeyC': //c
                copyTitle(); //复制title  这里不加break是为了不影响正常的复制行为
            case "KeyW": //w
                console.log("path", path);
                break;
            default:
                return true;
        } //屏蔽浏览器对于这些快捷键的响应避免一些奇奇怪怪的操作
        event.preventDefault();
        event.returnValue = false;
        return false;
    });
    /**
     * 设置元素可编辑并获取 逐级向上获取titile
     */
    function editSelect() {
        var selectElem = path[0];
        selectElem.setAttribute("contenteditable", "true");
        copyTitle();
    }
    var div = document.createElement('div');
    div.style.display = "none";
    /**
     * 移除选中的元素 不使用remove 是因为这个方法并没有真正删除
     */
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
    function outline(elemt) {
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
    function nodePath(node) {
        var path = [node];
        while (node.parentElement != null) {
            node = node.parentElement;
            path.push(node);
        }
        return path;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi572R6aG156yU6K6wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsi572R6aG156yU6K6wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7QUFDakIsK0JBQStCO0FBQy9CLHlDQUF5QztBQUN6QyxxQkFBcUI7QUFDckIsdUJBQXVCO0FBQ3ZCLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLHFCQUFxQjtBQUNyQixrQkFBa0I7QUFDbEIsQ0FBQztJQUNHLFlBQVksQ0FBQztJQUNiLHlCQUF5QjtJQUN6QixRQUFRO0lBQ1IsSUFBSSxJQUFrQixDQUFDO0lBQ3ZCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFLO1FBQ3pDLElBQUcsS0FBSyxDQUFDLE1BQU0sWUFBWSxXQUFXLEVBQUM7WUFDbkMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUN4QjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsY0FBYztJQUNkLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFLO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUNkLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLE1BQU07Z0JBQ1AsVUFBVSxFQUFFLENBQUE7Z0JBQ1osTUFBTTtZQUNWLEtBQUssV0FBVztnQkFDWixZQUFZLEVBQUUsQ0FBQTtnQkFDZCxNQUFNO1lBQ1YsS0FBSyxNQUFNLEVBQUMsR0FBRztnQkFDWCxTQUFTLEVBQUUsQ0FBQSxDQUFBLGlDQUFpQztZQUNoRCxLQUFLLE1BQU0sRUFBQyxHQUFHO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFBO2dCQUN4QixNQUFNO1lBQ1Y7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