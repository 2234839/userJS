import config, { KeyMap, AllStoreName } from "./config";
import { CommandControl } from "./function/command";
import { fun, outline, loadChanges } from "./function/fun";
import { AllStore, getLocalItem } from "./lib/store";
import { editElement, setPath } from "./state/index";
import { Warning } from "./ui/warning";
import { nodePath } from "./util";
// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.36
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==
; (async function () {
    /** 调试用 */
    (<any>window).CommandControl = CommandControl
    /** 监听鼠标移动 */
    function mouse(event: Event) {
        if (event.target instanceof HTMLElement) {
            setPath(nodePath(event.target))
            outline(event.target);
        }
    }
    if (config.elementEdit) {
        document.addEventListener('mouseover', mouse);
    }
    /** 监测按键事件 */
    document.addEventListener('keydown', async function (event) {
        const code = event.code;
        //有元素获得焦点，视为正在输入文本，不执行下面的功能
        if (document.querySelectorAll(":focus").length > 0) { return; }

        if (code === 'F2' || code === 'KeyM') {
            return switchState(mouse, event);
        }
        /** 没有开启编辑功能 */
        if (config.elementEdit === false) {
            return;
        }
        console.log('keyCode', code);
        if (code in KeyMap) { /** 执行按键绑定的函数 */
            ///@ts-ignore
            const funNameList = KeyMap[code]
            funNameList.forEach((funName:string)=>{
                ///@ts-ignore
                fun[funName]()
            })
        }
    });

    /** 元素失去焦点 */
    document.addEventListener('focusout', function () {
        console.log('元素失去焦点', event.target);
    })

    /** 元素被编辑了 */
    document.addEventListener('input', function (event: Event) {
        if (event.target instanceof HTMLElement) {
            const el: HTMLElement = event.target
            if (el.innerHTML.length > 10 * 1000)
                new Warning({ msg: '该元素文本过大，将不会保存这里的修改，请选择更确定的文本元素。' }).autoHide()
            else
                editElement.add(el)
        }
    })

    /** 切换状态 */
    function switchState(mouse: (event: Event) => void, event: KeyboardEvent) {
        config.elementEdit = !config.elementEdit;
        console.log('切换编辑状态', config.elementEdit);
        if (config.elementEdit) //不处于编辑状态则移除鼠标监听事件，降低性能的消耗
            document.addEventListener('mouseover', mouse);
        else
            document.removeEventListener("mouseover", mouse);
        event.preventDefault();
        event.returnValue = false;
        return false;
    }

    /** 自动加载更改 */
    const AllStoreStr = await getLocalItem(AllStoreName, undefined)
    if (AllStoreStr === undefined)
        return console.warn('没有可用的存储库');
    const allStroe = <AllStore>JSON.parse(AllStoreStr)
    if (document.readyState === "complete") {
        loadChanges(allStroe)
    } else {
        window.addEventListener('load', function () {
            loadChanges(allStroe)
        })
    }
})();
