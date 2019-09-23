/** 将url转为友好的名字 */
export function urlToName(url: string) {
    // return url.match(/\d+\.\d+\.\d+\.\d+(.*)/)[1].split('/').map(str => str.replace(/\//g, '')).join('_')
    return url.split('/').map(str => str.replace(/[^a-zA-Z0-9]/g, '_')).join('_')

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

export function getTextConten(el:Element){
    if(el!==undefined && 'textContent' in el){
        return el.textContent
    }else{
        console.warn('textContent 属性不存在',el);
        return ''
    }
}