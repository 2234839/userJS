import { commandJSON } from "../function/Command";

/** 设置一条本地存储 */
export async function setLocalItem(name: string, value: string) {
    //为了在非油猴环境下存储依旧能起一部分的作用
    if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM")) {
        return await GM.setValue(name, value)
    } else {
        return await localStorage.setItem(name, String(value))
    }
}

/** 读取一条本地存储 */
export async function getLocalItem<T>(/** 键名 */ name: string,/** 没有的时候的默认值 */ defaultValue?: T) {
    //为了在非油猴环境下存储依旧能起一部分的作用
    if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM")) {
        const res = await GM.getValue(name, defaultValue)
        console.log(res);

        return res
    } else {
        const value = localStorage.getItem(name)
        if (value === null)
            return await defaultValue
        return await value
    }
}

/** 存储所有的东西 */
export interface AllStore {
    CommandStack: commandJSON[]
    element_List: {
        [/** 选择器 */ name: string]: /** innerHTML */ string
    }
}