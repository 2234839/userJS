import { urlToName } from "./util";
import { api } from "./i_api";
import { getShowDocApi } from "./showDocApi";
import { getYapiApi } from "./yapi";
import util from "../网页笔记/util";

// ==UserScript==
// @name         api自动提取
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
/** 编译命令
parcel build --no-minify --no-source-maps .\api自动提取\api自动提取.ts
 */
; (async function () {
    if (!["https://www.showdoc.cc"].includes(location.origin)) {
        console.log("非指定网站");
        return
    }
    ///@ts-ignore
    const uw = (window.unsafeWindow) ? window.unsafeWindow : window;

    /** 将api转为ts的代码 */
    function apiToTypeScriptCode(api: api) {
        console.log(api);

        const name = urlToName(api.url)
        if (api.url.endsWith('list')) {
            /** 亿校云列表有不同的处理方式 */
            return `
            /** ${api.name} */
            @list_serch
            static ${name}(params?:list_serch & {
                ${
                api.parList.map(obj => {
                    return `/** ${obj.type} ${obj.describe} */${obj.name}${obj.must ? '' : '?'}: ${obj.type},`
                }).join('\n')
                }
            }):Promise<pagination_list<{
                ${
                api.resList.map(obj => {
                    return `/** ${obj.type} ${obj.describe} */${obj.name}${obj.must ? '' : '?'}: ${obj.type},`
                }).join('\n')
                }
            }>>{
                return ${api.method.toLocaleLowerCase()}('${api.url}', params)
            }`
        }
        return `
        /** ${api.name} */
        static ${name}(params?: {
            ${
            api.parList.map(obj => {
                return `/** ${obj.type} ${obj.describe} */${obj.name}${obj.must ? '' : '?'}: ${obj.type},`
            }).join('\n')
            }
        }):Promise< {
            ${
            api.resList.map(obj => {
                return `/** ${obj.type} ${obj.describe} */${obj.name}${obj.must ? '' : '?'}: ${obj.type},`
            }).join('\n')
            }
        }>{
            return get('${api.url}', params)
        }`

    }

    function getShowDocApiCode() {
        const api = apiToTypeScriptCode(getShowDocApi())
        util.copyTitle(api)
        return api
    }

    function getYapiApiCode() {
        const api = apiToTypeScriptCode(getYapiApi())
        util.copyTitle(api)
        return api
    }

    ///@ts-ignore
    uw._api = {
        getShowDocApiCode,
        getYapiApiCode,
    }
    setTimeout(() => {
        util.copyTitle(getShowDocApiCode())
    }, 1000);

    let url = ''
    setInterval(() => {
        const herf = location.href
        if (url === herf)
            return
        url = herf
        /** url发生了变化 */
        util.copyTitle(getShowDocApiCode())

    }, 6)

})()
let url = ''
function setInterval_start() {
    setInterval(() => {
        const herf = location.href
        console.log(1);

        if (url === herf)
            return
        url = herf
        /** url发生了变化 */
        console.log(url);
        setInterval_start()

    }, 10)
}
setInterval_start()