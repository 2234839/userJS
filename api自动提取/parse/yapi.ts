import { api } from "../i_api";
import { qALL, getTable } from "../util";
import { reduction_tree } from "./rap2-taobo";
import { 检测元素状态 } from "../../util/dom/elment";

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

export function 修改人列表_扩展() {
  const f = (ant_row_2: HTMLElement) => {
    const api = location.href.replace(/.*api\/(\d+)/, "$1");
    const project = location.href.replace(/.*project\/(\d+).*/, "$1");
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText).data.list as {
          content: string;
          uid: number;
          /** 秒数 */
          add_time: number;
        }[];
        const _edit_list = "_edit_list";
        const edit_list = document.querySelector("." + _edit_list);
        if (edit_list) {
          edit_list.remove();
        }
        const div = document.createElement("div");
        div.classList.add(_edit_list);
        div.innerHTML = data
          .map((el) => {
            return `${new Date(el.add_time * 1000).toLocaleString()} <img src="/api/user/avatar?uid=${
              el.uid
            }" style="width: 20px;height: 100%;"/> ${el.content}`;
          })
          .join("");
        ant_row_2.parentElement.appendChild(div);
      }
    });
    xhr.open("GET", `/api/log/list?typeid=${project}&type=project&page=1&limit=10&selectValue=${api}`);
    xhr.setRequestHeader(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0",
    );
    xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhr.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2");
    xhr.send();
  };
  检测元素状态("div.ant-row:nth-child(1)", f, f, () => {});
}
