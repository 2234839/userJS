import { key_funName } from "./function/fun";

/** 是不是开发环境 */
const isDev= location.href.includes('127.0.0.1')

const config={
    state: 0,
    /** 是否开启编辑 *///是开发环境自动开启
    elementEdit: isDev,
    /** 服务器地址 */
    serverIp: isDev ? 'https://127.0.0.1/note/' : 'https://shenzilong.cn/note/',
    /** 页面的url */
    locationUrl: decodeURIComponent(location.origin + location.pathname),
    /** 存储登录凭证的 */
    loginCredentials:'loginCredentials',
}
/** 存储修改的地方 */
export const AllStoreName = '_storeName_llej_' + config.locationUrl
export const KeyMap={
    "KeyQ":key_funName.editElement,
    'KeyD':key_funName.deleteElement,
    'KeyC':key_funName.copyTitle,
    'KeyW':key_funName.closeEdit,
    'KeyZ':key_funName.backOut,
    "KeyY":key_funName.undo,
    "KeyN":key_funName.addNote,
    "KeyS":key_funName.saveChanges,
    "KeyO":key_funName.uploadThe,
    "KeyP":key_funName.downloadThe,
    "KeyK":key_funName.register,
    "KeyL":key_funName.login
}
export default config
