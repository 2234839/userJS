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

; (async function () {
    ///@ts-ignore
    const uw = (window.unsafeWindow) ? window.unsafeWindow : window;

    /** 将api转为ts的代码 */
    function apiToTypeScriptCode(api: api) {
        console.log(api);

        const name = urlToName(api.url)
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
        return apiToTypeScriptCode(getShowDocApi())
    }

    function getYapiApiCode() {
        return apiToTypeScriptCode(getYapiApi())
    }

    ///@ts-ignore
    uw._api = {
        getShowDocApiCode,
        getYapiApiCode,
    }
    setTimeout(() => {
        util.copyTitle(getShowDocApiCode())
    }, 1000);

})()
/**
parcel build --no-minify --no-source-maps .\api自动提取\api自动提取.ts
 */