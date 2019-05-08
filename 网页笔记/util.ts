/** 用于复制文本的input */
const input_copy = document.createElement('input')
// input_copy.style.display='none'//不能设置为none因为会导致没有可访问性
input_copy.setAttribute('style', `
        position: absolute;
        top: -9999px;
        left: -9999px;`)
document.body.appendChild(input_copy)

/** 工具类 */
export default {

    /** 复制一个元素的titil 或者一段字符串到剪贴板 */
    copyTitle(el: HTMLElement | string) {
        let title
        if (typeof el === 'string')
            title = el
        else
            title = el.getAttribute("title");

        input_copy.setAttribute('readonly', 'readonly');
        input_copy.setAttribute('value', title);
        input_copy.select();
        input_copy.setSelectionRange(0, 9999);
        document.execCommand('copy')
    }
}