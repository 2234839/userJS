import { api, par } from "../i_api";
import { urlToName, copyStr } from "../util";

/** 将api转为ts的代码 */
export function apiToTypeScriptCode(api: api) {
    console.log(api);
    const name = urlToName(api.url)
    return `
        /** ${api.name} */
        static ${name}(params?:
            ${parse_par_List(api.parList)}
        ):Promise< ${parse_par_List(api.resList)} >{ return ${api.method.toLocaleLowerCase()}('${api.url}', params) }`

}

/** 解析api的par为字符串 */
function parse_par_item(par: par,level=0) {
    return `${copyStr('\t',level)}/** ${par.type} ${par.describe} */${par.name}${par.must ? '' : '?'}: ${((): string => {
        if (par.children === undefined)
            return par.type
                .replace("string(", '_string(') /** string 这种基本类型不能够使用引用的方式解决，所以加上一个_来区分 */
                .replace("number(", '_number(')
                .replace("String", 'string') /** 基元类型不要用 */
                .replace("Number", 'number')
                .replace('(', '<')
                .replace(')', '>')
                .replace('-', '_')

        return `${parse_par_List(par.children,level+1)}`
    })()}`;
}



/** 解析api的par数组为字符串 */
function parse_par_List(par: par[],level=1) {
    return `{\r${par.map((el)=>parse_par_item(el,level)).join(',\n')}}`;
}