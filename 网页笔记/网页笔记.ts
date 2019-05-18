import $, { nodePath, getSelectors, ajax_get } from "./util";
import config from "./config";
import { deleteSelect, CommandControl, editSelect, closeEditSelect, addNote } from "./Command";
import { Warning } from "./ui/warning";
import { Message } from "./ui/message";
import { setLocalItem, getLocalItem, AllStore } from "./store";
import { async } from "q";
import { _login, remote_getStore, remote_setStore, _regist } from "./ajax";
// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.35
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==
;(async function () {
    /** 调试用 */
    (<any>window).CommandControl = CommandControl

    /** 存储鼠标所在位置的所有元素 */
    let path:HTMLElement[];
    /** 标记被修改后的元素，以便保存修改的内容 */
    const editElement:Set<HTMLElement>=new Set()
    /** 存储修改的地方 */
    const AllStoreName = '_storeName_llej_' + config.locationUrl
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
    document.addEventListener('keydown',async function (event) {
        var code = event.code;
        if (code === 'F2' || code === 'KeyM') {
            return switchState(mouse, event);
        }
        /** 没有开启编辑功能 */
        if(config.elemtEdit===false){
            return;
        }
        //有元素获得焦点，视为正在输入文本，不执行下面的功能
        if (document.querySelectorAll(":focus").length > 0) {
            return;
        }
        switch (code) {
            case 'KeyQ':/** 使元素可编辑 */
                if (path[0].innerHTML.length > 10 * 1000)
                    return new Warning({ msg: '该元素内容过大，请选择更确定的文本元素。' }).autoHide()
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
            case "KeyO":/** 将修改上传到云端 */
                remote_setStore({
                    url: config.locationUrl,
                    store: await saveChanges(editElement)
                }).then(r=>{
                    new Message({ msg:"云端存储:"+r.message }).autoHide()
                })
                break;
            case "KeyP":/** 从云端下载修改 */
                new Message({ msg: "正在读取云端存储"}).autoHide()
                remote_getStore({
                    url: config.locationUrl
                }).then(r => {
                    if (r.body===undefined || r.body.length===0)
                        return new Message({ msg: "云端存储:" + r.message}).autoHide()
                    const allStroe=<AllStore>JSON.parse(r.body[0].store)
                    loadChanges(allStroe)
                    new Message({ msg: "云端存储:" + r.message }).autoHide()
                })
                break;
            case "Keyk":/** 注册 */
                regist()
                break;
            case "KeyL":/** 登录 */
                login()
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

    /** 保存修改 */
    async function saveChanges(editElement: Set<HTMLElement>) {
        let data:AllStore = {
            element_List:{},
            CommandStack: CommandControl.getCommandStackJsonObj()
        }
        editElement.forEach(el=>{
            const selectors= getSelectors(el)
            data.element_List[selectors] = el.innerHTML
        })
        const data_str = JSON.stringify(data)
        await setLocalItem(AllStoreName,JSON.stringify(data))
        return data_str
    }

    /** 加载修改 */
    async function loadChanges(allStroe:AllStore){
        for (const selectors in allStroe.element_List) {
            if (allStroe.element_List.hasOwnProperty(selectors)) {
                const html = allStroe.element_List[selectors];
                const el = document.querySelector(selectors)
                if (el === null)
                    return console.error(`${selectors} 的元素无法找到，赋值失败`);
                editElement.add(<HTMLElement>el)
                el.innerHTML = html
            }
        }
        CommandControl.loadCommandJsonAndRun(allStroe.CommandStack)
    };

    function login(){
        const titile = '>>>网页笔记<<<\n'
        const user = prompt(titile + '请输入用户名');
        if (user === null)
            return
        const secret_key = prompt(titile + '请输入密钥。');
        if (secret_key === null)
            return
        _login({
            user, secret_key
        }).then(r => {
            new Message({ msg: r.message }).autoHide()
        })
    }
    function regist() {
        const titile ='>>>网页笔记<<<\n'
        const user = prompt(titile+'请输入用户名');
        if(user===null)
            return
        const secret_key = prompt(titile +'请输入密钥。要记住哦，没有提供找回功能');
        if (secret_key === null)
            return
        _regist({
            user,secret_key
        }).then(r=>{
            new Message({ msg: r.message}).autoHide()
        })
    }

    /** 自动保存 */
    setInterval(function () {
        saveChanges(editElement);
        new Message({ msg: '自动保存成功...' }).autoHide()
    }, 1000 * 60)

    /** 自动加载更改 */
    const AllStoreStr = await getLocalItem(AllStoreName, undefined)
    if (AllStoreStr === undefined)
        return console.warn('没有可用的存储库');
    const allStroe = <AllStore>JSON.parse(AllStoreStr)
    if (document.readyState === "complete"){
        loadChanges(allStroe)
    }else{
        window.addEventListener('load', function () {
            loadChanges(allStroe)
        })
    }
})();