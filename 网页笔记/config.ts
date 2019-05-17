/** 是不是开发环境 */
const isDev= location.href.includes('127.0.0.1')

export default {
    state: 0,
    /** 是否开启编辑 *///是开发环境自动开启
    elemtEdit: isDev,
    /** 服务器地址 */
    serverIp: isDev ? 'https://127.0.0.1/note/' : 'https://shenzilong.cn/note/',
}