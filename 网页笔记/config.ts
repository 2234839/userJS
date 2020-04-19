
/** 是不是开发环境 */
export const isDev= false

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
/** 存储命令栈的地方 */
export const AllStoreName = '_storeName_llej_' + config.locationUrl

export default config
