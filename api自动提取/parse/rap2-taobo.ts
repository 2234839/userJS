import { getTable, getTextConten, getElText } from "../util";
import { api, par } from "../i_api";

/** 获取rap2平台的api */
export function getRap2Api(): api {
    console.log("参数列表=========================");

    const par_el=<HTMLElement> document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(2) > div.body > div > div.RSortableWrapper.depth-1")
    /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */
    const par_table = getTable( par_el,  ".SortableTreeTableRow",".td.payload",[undefined,(el)=>{
        return el.querySelector("input").checked ? "true" : "false"
    }])

    const res_el=<HTMLElement> document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(3) > div.body > div > div.RSortableWrapper.depth-1")
    /** 参数名称 参数说明 类型 schema */
    const res_table = getTable( res_el,  ".SortableTreeTableRow",".td.payload",[undefined,(el)=>{
        return el.querySelector("input").checked ? "true" : "false"
    }])
    console.log("参数和响应",par_el,res_el,par_table, res_table);
    const get_level_list=(table: HTMLElement)=>{
        const tr_list=table.querySelectorAll(".SortableTreeTableRow")
        return Array.from(tr_list).map(tr=>{
            const match=tr.parentElement.className.match(/depth(\d)/)
            if(match=== null)
                return 0
            else{
                return Number(match[1])+1
            }
        })
    }
    const api: api = {
        url: getElText('.summary li:nth-child(1) a'),
        name: getElText('#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > div > span'),
        describe:"",
        method: getElText("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > ul > li:nth-child(2) > span > span:nth-child(2)"),
        parList: reduction_tree(par_el, par_table.map(str_list => {
            return {
                name: str_list[0].replace(/BODY$/,'').replace(/QUERY$/,''),
                must: str_list[1] === "true",
                type: str_list[2],
                describe: str_list[5],
            }
        }),get_level_list),
        resList: reduction_tree(res_el, res_table.map(str_list => {
            return {
                name: str_list[0],
                must: str_list[1] === "true",
                type: str_list[2],
                describe: str_list[5],
            }
        }),get_level_list),
    }
    console.log("最终结果", par_table, res_table, api);

    return api

}


/** 根据table 获取到树的结构 */
function reduction_tree(table: HTMLElement, parlist: par[],get_level_list:(table: HTMLElement)=>number[]) {
    /** 等级数组 [0,1,1,1,2,2,1,1] 这样的 */
    const level_list = get_level_list(table)

    /** 最高级 */
    const hierarchy: par[] = []
    let current_hierarchy = hierarchy
    for (let i = 0; i < level_list.length; i++) {
        const level = level_list[i];
        if (i === 0) {
            current_hierarchy.push(parlist[i])
            continue;
        }
        /** 同级元素 */
        if (level > level_list[i - 1]) { /** 按一般规律来说它就是 当前层级数组最后一个元素的 子级 */
            const parent = current_hierarchy[current_hierarchy.length - 1]
            if (parent.children === undefined) {
                parent.children = []
            }
            /** 指向下一级 */
            current_hierarchy = parent.children

        } else if (level === level_list[i - 1]) { /** 同级的 */

        } else { /** 小于的要提升当前层级 */
            /** 从最高的0级开始降级,直到它所在的等级 */
            let demotion_temp = hierarchy
            /** 开始降级 */
            for (let i = 0; i < level; i++) {
                /** 按一般规律来说 它一定生成在最后一个元素的子级 */
                demotion_temp = demotion_temp[demotion_temp.length - 1].children
            }
            /** 指向将到的级别 */
            current_hierarchy = demotion_temp
        }
        /** 将元素添加到当前层级 */
        current_hierarchy.push(parlist[i])
    }
    return hierarchy
}
