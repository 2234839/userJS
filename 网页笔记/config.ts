import { readable, writable } from "svelte/store";
import { reactive, watchEffect } from "vue";
import { Message } from "./ui/message";
/** 是不是开发环境 */
export const isDev = (window as any).__llej__userjs__dev__ === true;

export const config = reactive({
  state: 0, //是开发环境自动开启
  /** 是否开启编辑 */ elementEdit: isDev,
  /** 服务器地址 */
  serverIp: "https://shenzilong.cn/note/", // isDev ? 'https://127.0.0.1/note/' : 'https://shenzilong.cn/note/',
  /** 页面的url */
  locationUrl: decodeURIComponent(location.origin + location.pathname),
  /** 存储登录凭证的 */
  loginCredentials: "loginCredentials",
});

export const elementEdit = writable(config.elementEdit, (set) => {
  watchEffect(() => {
    set(config.elementEdit);
  });
});
elementEdit.subscribe((value) => {
  config.elementEdit = value;
});

watchEffect(() => {
  console.log('[config.elementEdit]',config.elementEdit)
  new Message({ msg: `${config.elementEdit ? "开启" : "关闭"}编辑模式` }).autoHide();
});

/** 存储命令栈的地方 */
export const AllStoreName = "_storeName_llej_" + config.locationUrl;
export default config;
