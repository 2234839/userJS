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

/** 将table元素解析为字符串二维数组 */
export function getTable(el:HTMLElement,tr_selector="tr",td_selector="td",/** 特定元素的识别器 */recognizer:{
    [i:number]:(el:HTMLElement)=>string
}={}){
    const table:string[][]=[]
    for (let i = 0; i < el.querySelectorAll(tr_selector).length; i++) { /** tr */
        const tr_el = el.querySelectorAll(tr_selector)[i];
        const tr=[]
        for (let j = 0; j < tr_el.querySelectorAll(td_selector).length; j++) { /** tr */
            const td_el =<HTMLElement> tr_el.querySelectorAll(td_selector)[j];
            if(recognizer[j]!==undefined){
                tr.push(recognizer[j](td_el))
            }else{
                tr.push(td_el.textContent.trim())
            }
        }
        table.push(tr)
    }
    return table
}

/** 获取指定元素的TextContent */
export function getElText(selsector:string){
    const el=document.querySelector(selsector)
    if(el===null){
        return ""
    }
    return el.textContent
}
/** 复制某个字符串多少次 */
export function copyStr(el:string,length:number) {
    let str=""
    for (let index = 0; index < length; index++) {
        str+=el
    }
    return str
}