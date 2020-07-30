import { api } from "../i_api";
import { qALL, getTextConten } from "../api_util";

/** 获取showDoc平台的api */
export async function getShowDocApi(): Promise<api> {
  const api: api = {
    url: getTextConten(qALL("main .main-editor li")[1]),
    name: getTextConten(qALL("main div")[0]),
    describe: getTextConten(qALL("main .main-editor li")[1]),
    method: getTextConten(qALL("main .main-editor li")[2]),
    parList: Array.from(qALL("table")[0].querySelectorAll("tr"))
      .filter((el, i) => {
        return i !== 0;
      })
      .filter((el) => {
        /** 他有时参数列表不全，通过这个去除空 */
        if (getTextConten(el.querySelectorAll("td")[0]) === "" && getTextConten(el.querySelectorAll("td")[2]) === "")
          return false;
        return true;
      })
      .map((el) => {
        return {
          name: getTextConten(el.querySelectorAll("td")[0]),
          /** 是否必需 */
          must: getTextConten(el.querySelectorAll("td")[1]) === "是",
          type: getTextConten(el.querySelectorAll("td")[2]),
          describe: getTextConten(el.querySelectorAll("td")[3]),
        };
      }),
    /** 返回结果的列表 */
    resList: Array.from(qALL("table")[1].querySelectorAll("tr"))
      .filter((el, i) => {
        return i !== 0;
      })
      .map((el) => {
        return {
          name: getTextConten(el.querySelectorAll("td")[0]),
          /** 是否必需 */
          must: true,
          type: getTextConten(el.querySelectorAll("td")[1]),
          describe: getTextConten(el.querySelectorAll("td")[2]),
        };
      }),
  };
  return api;
}
