import { api } from "../i_api";
import { qALL, getTable } from "../util";
import { reduction_tree } from "./rap2-taobo";

const $$ = qALL;

/** 获取Yapi平台的api */
export function getYapiApi(): api {
  const desNodeList = $$(".interface-title").includes("备注");
  const describe = desNodeList.length === 0 ? "" : desNodeList[0].nextElementSibling.textContent;
  const res_el = <HTMLElement>(
    document.querySelector(
      "div.ant-table-wrapper:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3)",
    )
  );
  /** 参数名称 类型 是否必须 默认值 备注 其他信息*/
  const res_table = getTable(res_el, "tr", "td", [
    undefined,
    undefined,
    (el) => {
      return el.textContent !== "非必须" ? "true" : "false";
    },
  ]);
  /** body 参数 */
  const par_table = Array.from($$(".col-title"))
    .filter((el) => el.textContent.startsWith("Body"))[0]
    .parentElement.querySelector("table");
  const api: api = {
    url: $$(".tag-method + span")[0].textContent,
    name: $$(".interface-title + div div div:nth-child(2)")[0].textContent,
    describe,
    method: $$(".tag-method")[0].textContent,
    parList: Array.from(par_table.querySelectorAll("tr"))
      .filter((el, i) => {
        return i !== 0;
      })
      .map((el) => {
        return {
          name: el.querySelectorAll("td")[0].textContent,
          /** 是否必需 */
          must: el.querySelectorAll("td")[2].textContent !== "非必须",
          type: el.querySelectorAll("td")[1].textContent,
          describe: el.querySelectorAll("td")[4].textContent,
        };
      }),

    resList: reduction_tree(
      res_el,
      res_table.map((str_list) => {
        return {
          name: str_list[0],
          must: str_list[2] === "true",
          type: str_list[1],
          describe: `${str_list[4]} ${str_list[5]}`,
        };
      }),
      (el) => {
        const tr = el.querySelectorAll("tr");
        return Array.from(tr).map((tr) => {
          return Number(tr.className.replace(/.*(\d+)/, "$1"));
        });
      },
    ),
  };
  return api;
}
