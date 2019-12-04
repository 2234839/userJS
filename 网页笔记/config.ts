import { key_funName as fun } from "./function/fun";

/** 是不是开发环境 */
const isDev= location.href.includes('127.0.0.1')

const config={
    state: 0,
    /** 是否开启编辑 *///是开发环境自动开启
    elementEdit: isDev,
    /** 服务器地址 */
    serverIp: 'https://shenzilong.cn/note/',// isDev ? 'https://127.0.0.1/note/' : 'https://shenzilong.cn/note/',
    /** 页面的url */
    locationUrl: decodeURIComponent(location.origin + location.pathname),
    /** 存储登录凭证的 */
    loginCredentials:'loginCredentials',
}
/** 存储修改的地方 */
export const AllStoreName = '_storeName_llej_' + config.locationUrl
export const KeyMap={
    "KeyQ":[fun.editElement],
    'KeyD':[fun.deleteElement],
    'KeyC':[fun.copyTitle],
    'KeyW':[fun.closeEdit],
    'KeyZ':[fun.backOut],
    "KeyY":[fun.undo],
    "KeyN":[fun.addNote],
    "KeyS":[fun.saveChanges],
    "KeyO":[fun.uploadThe],
    "KeyP":[fun.downloadThe,fun.saveChanges],
    "KeyK":[fun.register],
    "KeyL":[fun.login]
}
export default config
