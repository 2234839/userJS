const input_copy=document.createElement('input')
// input_copy.style.display='none'
document.body.appendChild(input_copy)

export default {

    copyTitle(el:HTMLElement) {
        //获取元素的描述并将他们添加到剪贴板  目前支持mdn 其它的可能支持
        let title = el.getAttribute("title");
        console.log('title',title)
        input_copy.value=title
        input_copy.select();
        console.log(document.execCommand('copy')); //复制
        console.log(el, title,input_copy,input_copy.value);

    }
}