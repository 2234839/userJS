import util from "../网页笔记/util";
import { apiToTypeScriptCode } from "./parse/apiToTypeScriptCode";
import { getShowDocApi } from "./parse/showDocApi";
import { swagger_bootstrap_ui } from "./parse/swagger-bootstrap-ui";
import { getYapiApi } from "./parse/yapi";

// ==UserScript==
// @name         api自动提取
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @include      https://www.showdoc.cc/*
// @include      http://192.*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
/** 编译命令
parcel build --no-minify --no-source-maps .\api自动提取\api自动提取.ts
 */
; (async function () {
    console.log('api 自动提取开始运行');

    const uw = window.unsafeWindow ? window.unsafeWindow : window;



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
    function get_swagger_bootstrap_ui_code() {
        const api = apiToTypeScriptCode(swagger_bootstrap_ui())
        util.copyTitle(api)
        return api
    }

    console.log("test");

    uw._api = {
        getShowDocApiCode,
        getYapiApiCode,
        get_swagger_bootstrap_ui_code: get_swagger_bootstrap_ui_code
    }
    setTimeout(() => {
        util.copyTitle(get_swagger_bootstrap_ui_code())
    }, 1000);

})()

let url = ''
function setInterval_start() {
    setInterval(() => {
        const herf = location.href

        if (url === herf)
            return
        url = herf
        /** url发生了变化 */
        console.log(url);
        setInterval_start()

    }, 10)
}
setInterval_start()