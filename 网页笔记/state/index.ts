/** 当前被选中的元素 */

export let currentElement:HTMLElement

export let path:HTMLElement[]

export function setPath(elList:HTMLElement[]) {
    path=elList
    currentElement=elList[0]
}

/** 标记被修改后的元素，以便保存修改的内容 */
export const editElement:Set<HTMLElement>=new Set()