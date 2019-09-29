import { getTable, getTextConten, getElText } from "../util";
import { api, par } from "../i_api";

/** 获取 swagger_bootstrap_ui 页面的ui */
export function swagger_bootstrap_ui(): api {
    const this_tab = document.querySelector('.layui-tab-item.layui-show .swbu-main')

    const par_el=this_tab.querySelectorAll("table")[2]
    const res_el=this_tab.querySelectorAll("table")[6]

    /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */
    const par_table = getTable(par_el)
    /** 参数名称 参数说明 类型 schema */
    const res_table = getTable(res_el)

    console.log(par_table, res_table);
    const api: api = {
        url: this_tab.querySelector('div p:nth-child(1) code').textContent,
        name: getElText('.layui-tab-item.layui-show .tab-pane div:nth-child(2) div'),
        describe: this_tab.querySelector('div p:nth-child(5) code').textContent,
        method: this_tab.querySelector('div p:nth-child(2) code').textContent,
        parList: reduction_tree(par_el, par_table.map(str_list => {
            return {
                name: str_list[0],
                must: str_list[3] === "true",
                type: str_list[4],
                describe: str_list[0],
            }
        })),
        resList:reduction_tree(res_el, res_table.map(str_list => {
            return {
                name: str_list[0],
                must: undefined,
                type: str_list[2],
                describe: str_list[1],
            }
        })) ,
    }
    console.log("最终结果",par_table, res_table, api);

    return api

}


/** 根据table 获取到树的结构 */
function reduction_tree(table: HTMLTableElement, parlist: par[]) {
    /** 等级数组 [0,1,1,1,2,2,1,1] 这样的 */
    const level_list = Array.from(table.querySelectorAll('tr td:nth-child(1)'))
        .map(el => {
            /** swagger-bootstrap-ui 层级越高 这种元素越多 */
            return el.querySelectorAll('.treeTable-empty').length
        })

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
