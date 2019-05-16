export default {
    state: 0,
    /** 是否开启编辑 */
    elemtEdit: location.href.includes('127.0.0.1'),//默认127.0.0.1是开发环境自动开启
    /** 服务器地址 */
    serverIp:'https://127.0.0.1/note/',
}