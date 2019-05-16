/** 油猴的一些功能 */
declare const GM: {
    getValue<T>(/** 键名 */ name: string,/** 没有的时候的默认值 */ defaultValue?: T): Promise<string | undefined>
    setValue(name: string, value: string): Promise<string>
}

export async function setLocalItem(name: string, value: string){
    //为了在非油猴环境下存储依旧能起一部分的作用
    if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM")) {
        return await GM.setValue(name,value)
    }else{
        return await localStorage.setItem(name, String(value))
    }
}

export async function getLocalItem<T>(/** 键名 */ name: string,/** 没有的时候的默认值 */ defaultValue?:T ) {
    //为了在非油猴环境下存储依旧能起一部分的作用
    if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM")) {
        return await GM.getValue(name, defaultValue)
    } else {
        const value = localStorage.getItem(name)
        if (value===null)
            return await defaultValue
        return await value
    }
}