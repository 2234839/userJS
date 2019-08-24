import * as util from "../网页笔记/util";
import { urlToName } from "./util";
import { api } from "./i_api";
import { getShowDocApi } from "./showDocApi";
import { getYapiApi } from "./yapi";

/** 将api转为ts的代码 */
function apiToTypeScriptCode(api: api) {
    console.log(api);

    const name = urlToName(api.url)
    return `
/** ${api.name} */
export const ${name} = (par: {
    ${
        api.parList.map(obj => {
            return `/** ${obj.type} ${obj.describe} */${obj.name}${obj.must ? '' : '?'}: ${obj.type},`
        }).join('\n')

    }
}): Promise<resData<any>> => autoAjax('${api.url}', par)`
}

function getShowDocApiCode() {
    return apiToTypeScriptCode(getShowDocApi())
}

function getYapiApiCode() {
    return apiToTypeScriptCode(getYapiApi())
}

///@ts-ignore
window._api={
    getShowDocApiCode,
    getYapiApiCode,

}


// util.default.copyTitle(getShowDocApiCode())

