export function 检测元素状态(
  selector: string,
  出现: (el: HTMLElement) => void=()=>{},
  变化: (el: HTMLElement) => void=()=>{},
  消失: () => void=()=>{},
) {
  let status = false;
  let html = "";
  setInterval(() => {
    const el = document.querySelector(selector) as HTMLElement;
    if (status && el && el.innerHTML !== html) {
      html = el.innerHTML;
      变化(el);
    }
    if (el && !status) {
      status = true;
      出现(el);
    } else if (!el && status) {
      status = false;
      消失();
    }
  }, 100);
}

export { getSelectors } from "../../网页笔记/util";
