import * as util from "../网页笔记/util";

interface api {
    url: string
    name: string
    describe: string
    method: string
    parList: {
        name: string
        /** 是否必需 */
        must: boolean
        type: 'string' | 'number'
        describe: string
    }[]
}

function getShowDocApiCode() {
    return apiToTypeScriptCode(getShowDocApi())
}

/** 获取showDoc平台的api */
function getShowDocApi(): api {
    const api: api = {
        url: qALL('main .main-editor li')[1].textContent,
        name: qALL('main div')[0].textContent,
        describe: qALL('main .main-editor li')[1].textContent,
        method: qALL('main .main-editor li')[2].textContent,
        parList: Array.from(qALL('table')[0].querySelectorAll('tr')).filter((el, i) => {
            return i !== 0
        }).map(el => {
            return {
                name: el.querySelectorAll('td')[0].textContent,
                /** 是否必需 */
                must: el.querySelectorAll('td')[1].textContent === '是',
                type: getType(el.querySelectorAll('td')[2].textContent),
                describe: el.querySelectorAll('td')[3].textContent
            }
        })
    }
    return api;
};

function qALL(selector: string) {
    return document.querySelectorAll(selector)
}

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
}): Promise<resData<any>> => autoAjax('${api.url}', par)

    `
}

/** 将url转为友好的名字 */
function urlToName(url: string) {
    return url.match(/\d+\.\d+\.\d+\.\d+(.*)/)[1].split('/').map(str => str.replace(/\//g, '')).join('_')
}

/** 从int double 之类的 获取类型 */
function getType(str:string){
    if(str.includes('int'))
        return 'number'
    if (str.includes('long'))
        return 'number'
    if (str.includes('double'))
        return 'number'
    return 'string'
}

util.default.copyTitle(getShowDocApiCode())

