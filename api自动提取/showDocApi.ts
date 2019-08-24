import { api } from "./i_api";
import { qALL, getType } from "./util";



/** 获取showDoc平台的api */
export function getShowDocApi(): api {
    const api: api = {
        url: qALL('main .main-editor li')[1].textContent,
        name: qALL('main div')[0].textContent,
        describe: qALL('main .main-editor li')[1].textContent,
        method: qALL('main .main-editor li')[2].textContent,
        parList: Array.from(qALL('table')[0].querySelectorAll('tr')).filter((el, i) => {
            return i !== 0
        }).map(el => {
            return {
                name: el.querySelectorAll('td')[0].textContent,
                /** 是否必需 */
                must: el.querySelectorAll('td')[1].textContent === '是',
                type: getType(el.querySelectorAll('td')[2].textContent),
                describe: el.querySelectorAll('td')[3].textContent
            }
        })
    }
    return api;
};