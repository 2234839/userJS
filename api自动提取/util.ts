/** 将url转为友好的名字 */
export function urlToName(url: string) {
    return url.match(/\d+\.\d+\.\d+\.\d+(.*)/)[1].split('/').map(str => str.replace(/\//g, '')).join('_')
}

/** 从int double 之类的 获取类型 */
export function getType(str:string){
    if(str.includes('int'))
        return 'number'
    if (str.includes('long'))
        return 'number'
    if (str.includes('double'))
        return 'number'

    /** 没有类型注释,传进来的是示例,通过示例判断类型 */
    if(isNaN(Number(str)))
        return 'string'
    return 'number'
}



export function qALL<T>(selector: string,t?:T) {
    interface NodeList<T extends Node> extends NodeListOf<T>{
        /** 扩展用法,通过textContent过滤出元素数组 */
        includes(text:string):Element[]
    }
    const res=<NodeList<Element>><unknown>document.querySelectorAll(selector)
    res.includes=function(text) {
        return Array.from(res).filter(el=>{
            return el.textContent.includes(text)
        })
    }
    return res
}
