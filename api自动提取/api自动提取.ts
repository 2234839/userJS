import util from "../网页笔记/util";
import { apiToTypeScriptCode } from "./parse/apiToTypeScriptCode";
import { getShowDocApi } from "./parse/showDocApi";
import { swagger_bootstrap_ui } from "./parse/swagger-bootstrap-ui";
import { getYapiApi } from "./parse/yapi";
import { api } from "./i_api";
import { getRap2Api } from "./parse/rap2-taobo";

// ==UserScript==
// @name         api自动提取
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @include      https://www.showdoc.cc/*
// @include      http://192.*
// @include      *://rap2.taobao.org/*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
/** 编译命令
parcel build --no-minify --no-source-maps .\api自动提取\api自动提取.ts
 */
; (async function () {
    console.log('api 自动提取开始运行');

    const uw = window.unsafeWindow ? window.unsafeWindow : window;

    function getcode(fun:()=>api) {
        return ()=>{
            const api = apiToTypeScriptCode(fun())
            util.copyTitle(api)
            return api
        }
    }


    console.log("test");

    uw._api = {
        getShowDocApiCode:getcode(getShowDocApi),
        getYapiApiCode:getcode(getYapiApi),
        get_swagger_bootstrap_ui_code: getcode(swagger_bootstrap_ui),
        get_rap2_taobao_code:getcode(getRap2Api)
    }
    setTimeout(() => {
        util.copyTitle(uw._api.get_rap2_taobao_code())
    }, 2000);

})()