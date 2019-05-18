import { ajax_get, getJSon } from "./util";
import config from "./config";
import { async } from "q";

/** 用来识别身份的key */
let key=''

/** 附带登录信息的ajax */
export async function au_getJSON(url:string,data?:any){
    if(data===undefined)
        data={}
    data.key=key
    return getJSon(url,data)
}

/** 登录 */
export async function _login(par:{
    user: string,
    secret_key: string,
}){
    const res = await getJSon(config.serverIp + 'login', par)
    if(res.body && res.body.length>0)
        key=res.body
    return res
}

/** 注册 */
export async function _regist(par: {
    user: string,
    secret_key: string,
}) {
    return await getJSon(config.serverIp + 'register', par)
}

/** 获取存储库 */
export async function remote_getStore(par: {
    url: string,
}) {
    return await au_getJSON(config.serverIp + 'getStore', par)
}

/** 设置存储库 */
export async function remote_setStore(par: {
    url: string,
    store: string
}) {
    return await au_getJSON(config.serverIp + 'setStore', par)
}

/** 获取存储库 */
export async function remote_getAllStore() {
    return await au_getJSON(config.serverIp + 'getAllStore')
}