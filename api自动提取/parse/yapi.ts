import { api } from "../i_api";
import { qALL } from "../util";

const $$ =qALL

/** 获取Yapi平台的api */
export function getYapiApi(): api {
    const desNodeList=$$('.interface-title').includes('备注')
    const describe=desNodeList.length>0 ? '' : desNodeList[0].nextElementSibling.textContent
    const api: api = {
        url: $$('.tag-method + span')[0].textContent,
        name: $$('.interface-title + div div div:nth-child(2)')[0].textContent,
        describe,
        method: $$('.tag-method')[0].textContent,
        parList: Array.from($$('table')[0].querySelectorAll('tr')).filter((el, i) => {
            return i !== 0
        }).map(el => {
            return {
                name: el.querySelectorAll('td')[0].textContent,
                /** 是否必需 */
                must: el.querySelectorAll('td')[1].textContent === '是',
                type: el.querySelectorAll('td')[2].textContent,
                describe: el.querySelectorAll('td')[3].textContent
            }
        }),resList:[]
    }
    return api;
};