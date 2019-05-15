import $ from "./util";
import config from "./config";
import { deleteSelect, CommandControl, editSelect, closeEditSelect, addNote } from "./Command";
import { Warning } from "./ui/warning";
import { Message } from "./ui/message";



// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.32
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @grant        GM_getValue    //油猴的存储接口
// @grant        GM_setValue
// ==/UserScript==


;(function () {
    //尝试解决无效的脚本头部的问题

    /** 调试用 */
    // (<any>window).CommandControl = CommandControl

    //为了在非油猴环境下存储依旧能起一部分的作用
    if (window.hasOwnProperty("GM_getValue") && window.hasOwnProperty("GM_setValue")) {
        localStorage.getItem = (<any>window).GM_getValue;
        localStorage.setItem = (<any>window).GM_setValue;
    }

    /** 存储鼠标所在位置的所有元素 */
    let path:HTMLElement[];
    /** 被修改后的元素 */
    const editElement:Set<HTMLElement>=new Set()
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
    /** 监测按键事件 */
    document.addEventListener('keydown', function (event) {
        var code = event.code;
        if (code === 'F2') {
            return switchState(mouse, event);
        }
        //有元素获得焦点，视为正在输入文本，不执行下面的功能
        if (document.querySelectorAll(":focus").length > 0) {
            return;
        }
        switch (code) {
            case 'KeyQ':/** 使元素可编辑 */
                CommandControl.run(new editSelect(path[0]))
                break;
            case 'KeyD':/** 删除元素 */
                CommandControl.run(new deleteSelect(path[0]))
                break;
            case 'KeyC':/** 赋值titile */
                $.copyTitle(path[0])
                if(event.ctrlKey===false)//因为ctrl+c不应该被阻止
                    break
            case "KeyW":/** 关闭可编辑 */
                CommandControl.run(new closeEditSelect(path[0]))
                break;
            case 'KeyZ':/** 撤销 */
                CommandControl.backout()
                break;
            case "KeyY":/** 重做 */
                CommandControl.reform()
                break;
            case "KeyN":/** 新增笔记 */
                CommandControl.run(new addNote(path[0]))
                break;
            case "KeyS":/** 保存所有的修改 */
                saveChanges(editElement);
                new Message({ msg: '保存成功' }).autoHide()
                break;
            default:
                return true;
        }
    });

    /** 元素失去焦点 */
    document.addEventListener('focusout',function(){
        console.log('元素失去焦点', event.target );
    })

    /** 元素被编辑了 */
    document.addEventListener('input', function (event:Event) {
        if (event.target instanceof HTMLElement) {
            const el: HTMLElement = event.target
            if (el.innerHTML.length>10*1000)
                new Warning({msg:'该元素文本过大，将不会保存这里的修改，请选择更确定的文本元素。'}).autoHide()
            else
                editElement.add(el)
        }
    })

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
    /** 获取一个元素的所有父节点到html为止  */
    function nodePath(...path:Element[]):HTMLElement[]{
        while (path[path.length-1].parentElement != null) {
            path.push(path[path.length - 1].parentElement);
        }
        /** 只需要是HTMLElement的 */
        const HTMLElementPath =<HTMLElement[]> path.filter(el => el instanceof HTMLElement)
        return HTMLElementPath;
    }
    /** 切换状态 */
    function switchState(mouse: (event: Event) => void, event: KeyboardEvent) {
        config.elemtEdit = !config.elemtEdit;
        console.log('切换编辑状态', config.elemtEdit);
        if (config.elemtEdit) //不处于编辑状态则移除鼠标监听事件，降低性能的消耗
            document.addEventListener('mouseover', mouse);
        else
            document.removeEventListener("mouseover", mouse);
        event.preventDefault();
        event.returnValue = false;
        return false;
    }

    /** 保存的路径是页面的路径 */
    const localStorageSaveList = location.origin+location.pathname+'__saveList__llej__'

    /** 保存修改 */
    function saveChanges(editElement: Set<HTMLElement>) {
        const saveList: string[] = localStorage.getItem(localStorageSaveList) ? JSON.parse(localStorage.getItem(localStorageSaveList)) :[]
        const saveSet=new Set(saveList)
        editElement.forEach(el=>{
            const selectors= getSelectors(el)
            console.log(selectors);

            saveSet.add(selectors)
            localStorage.setItem(selectors,el.innerHTML)
        })
        localStorage.setItem(localStorageSaveList,JSON.stringify([...saveSet]))
    }
    /** 自动保存 */
    setInterval(function(){
        saveChanges(editElement);
        new Message({ msg: '自动保存成功...' }).autoHide()
    },1000*60)

    /** 加载修改 */
    function loadChanges(){
        const saveList: string[] = localStorage.getItem(localStorageSaveList) ? JSON.parse(localStorage.getItem(localStorageSaveList)) : []
        saveList.forEach(selectors=>{
            console.log(document.querySelector(selectors));

            document.querySelector(selectors).innerHTML=localStorage.getItem(selectors)
        })
    };
    window.addEventListener('load',function(){
        loadChanges()
        console.log('加载修改完毕');

    })

    /** 获取一个元素的选择器 */
    function getSelectors(el:Element){
        /** 通过path路径来确定元素 */
        let pathSelectors = nodePath(el).reverse().map(el =>{
            console.log(el);

            return el.nodeName + `:nth-child(${getIndex(el)})`
        }).join('>')

        /** 通过id以及class来确定元素 */
        let id_className=""
        const id=el.id
        if(id)
            id_className+=`#${id}`

        el.classList.forEach(className=>{
            id_className += `.${className}`
        })

        /** nth-child 选择 看它是第几个元素 */
        const index =getIndex(el)

        /** 最终构造出来的选择器 */
        return `${pathSelectors}${id_className}:nth-child(${index})`
    }

    /** 获取元素它在第几位 */
    function getIndex(el: Element){
        if(el.nodeName==='HTML')
            return 1
        return 1 + Array.from(el.parentElement.children).findIndex(child => child === el)
    }
})();

/*
# 使网页可编辑
* 按下F2启用元素编辑，再次按下可以关闭
* 将鼠标移动到你要修改的文本上方
*      按下 q 就会将该元素设为可编辑，对于链接可以按住alt键点击，这样就不会跳转
*      按下 w 设置元素为不可编辑
*      按下 d 就会删除该元素
*      按下 c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）,此命令不可被撤销和重做
*      按下 z 将会撤销一次命令
*      按下 y 将重做一次命令
*      按下 n 将添加一个便签笔记,此命令处于实验期，无法正常使用
*      按下 s 保存你的所有修改  每60秒会自动保存一次
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
* 新增了撤销和重做功能，优化了代码
* 因为（ctrl + 其他键）的模式 在一些浏览器上还是会出现冲突，故改为F2键来作为开关
* 下一版本将实现便签功能，以及撤销功能
* 正在进行云端存储的后台工作。在不远的将来将实现笔记备份至云端
* 希望各位能将你们想要的功能进行一个反馈
*/