import { api, par } from "../i_api";
import { qALL, getTable } from "../api_util";
import { reduction_tree } from "./rap2-taobo";
import { 检测元素状态 } from "../../util/dom/element";

const $$ = qALL;

/** 获取Yapi平台的api */
export async function getYapiApi(): Promise<api> {
  await new Promise((s) => {
    参数全展开(s);
  });
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
    parList: reduction_tree(
      par_table,
      Array.from(par_table.querySelectorAll("tr"))
        .filter((el, i) => {
          // console.log("[        el]", el, el.querySelectorAll("td")[0].textContent);
          return /** 第一行是标题 */ i !== 0;
        })
        .map((el) => {
          return {
            name: el.querySelectorAll("td")[0].textContent,
            /** 是否必需 */
            must: el.querySelectorAll("td")[2].textContent !== "非必须",
            type: yapTypePar(el),
            describe: el.querySelectorAll("td")[4].textContent,
          };
        }),
      (el) => {
        const tr = el.querySelectorAll("tbody tr");
        const level = Array.from(tr).map((tr) => {
          return Number(tr.className.replace(/.*(\d+)/, "$1"));
        });
        return level;
      },
    ),

    resList: reduction_tree(
      res_el,
      res_table.map((str_list, i) => {
        return {
          name: str_list[0],
          must: str_list[2] === "true",
          type: yapTypeRes(res_table, i),
          describe: `${str_list[4]} ${str_list[5]}`,
        };
      }),
      (el) => {
        const tr = el.querySelectorAll("tr");
        const level = Array.from(tr).map((tr) => {
          return Number(tr.className.replace(/.*(\d+)/, "$1"));
        });
        console.log(level, el, tr);

        return level;
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

export function 参数全展开(cb: () => void) {
  const id = setInterval(() => {
    const btn = (document.querySelectorAll(".ant-table-row-collapsed") as unknown) as HTMLElement[];
    if (btn.length) {
      btn.forEach((b) => {
        b.click();
      });
    } else {
      clearInterval(id);
      cb();
    }
  }, 350);
}

function yapTypePar(row: HTMLElement) {
  const type_text = row.querySelectorAll("td")[1].textContent;
  if (type_text) {
    return type_text;
  } else {
    if (row.querySelectorAll("td")[5].textContent) {
      return "Array";
    } else {
      return row.previousElementSibling.querySelectorAll("td")[5].textContent.split(": ")[1];
    }
  }
}

function yapTypeRes(table: string[][], i: number) {
  const row = table[i];
  if (row[1]) {
    return row[1];
  } else {
    if (row[5]) {
      return "Array";
    } else {
      return table[i - 1][5].split(": ")[1];
    }
  }
}
