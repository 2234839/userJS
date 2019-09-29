/** api的接口 */
export interface api {
    url: string
    name: string
    describe: string
    method: string
    parList:par[],
    resList: par[],
}

export interface par{
    name: string
    /** 是否必需 */
    must: boolean
    type: any
    describe: string,
    /** 可能存在子级的参数 */
    children?:par[]
}