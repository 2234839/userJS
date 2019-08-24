/** api的接口 */
export interface api {
    url: string
    name: string
    describe: string
    method: string
    parList: {
        name: string
        /** 是否必需 */
        must: boolean
        type: 'string' | 'number'
        describe: string
    }[]
}