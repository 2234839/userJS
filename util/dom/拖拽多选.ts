
export function 拖拽多选(Options: { targetSelector: string; 选择完毕: (els: HTMLElement[]) => void }) {
  let flag = false;
  let 选区 = [0, 0, 0, 0] as 选区;
  const div = document.createElement("div");
  div.style.cssText = `position: fixed;background: gray;opacity: .3;`;
  document.body.appendChild(div);
  let 选区矩形 = 选区_to_矩形(选区);
  document.addEventListener("mousedown", (event) => {
    遮罩.remove();
    if (event.ctrlKey) {
      flag = true;
      选区[0] = event.clientX;
      选区[1] = event.clientY;
      event.preventDefault(); // 阻止默认行为
      event.stopPropagation(); // 阻止事件冒泡
    }
  });
  document.addEventListener("mousemove", (event) => {
    if (!flag) {
      return;
    }
    选区[2] = event.clientX;
    选区[3] = event.clientY;
    选区矩形 = 选区_to_矩形(选区);
    div.style.left = 选区矩形[0] + "px";
    div.style.top = 选区矩形[1] + "px";
    div.style.width = 选区矩形[2] - 选区矩形[0] + "px";
    div.style.height = 选区矩形[3] - 选区矩形[1] + "px";
  });
  document.addEventListener("mouseup", (event) => {
    if (!flag) {
      return;
    }
    const td_list = Array.from(document.querySelectorAll(Options.targetSelector)) as HTMLElement[];
    const 选中 = td_list.filter((el) => 矩形相交(选区矩形, HtmlElement_to_矩形(el)));
    // console.log(选区矩形, 选中.map(HtmlElement_to_矩形), 选中);
    Options.选择完毕(选中);
    选中.map(HtmlElement_to_矩形).forEach(遮罩.add);
    flag = false;
  });
  return event;
}

type 矩形 = [/** 左上角x */ number, /** 左上角y */ number, /** 右上角x */ number, /** 右上角y */ number];
/** 选区和矩形的区别在于 [0,1] 不一定是左上角 */
type 选区 = [number, number, number, number];
function HtmlElement_to_矩形(el: HTMLElement): 矩形 {
  const rect = el.getBoundingClientRect();
  return [rect.left, rect.top, rect.right, rect.bottom];
}
function 矩形相交(rect1: 矩形, rect2: 矩形) {
  var a_min_x = rect1[0];
  var a_min_y = rect1[1];
  var a_max_x = rect1[2];
  var a_max_y = rect1[3];

  var b_min_x = rect2[0];
  var b_min_y = rect2[1];
  var b_max_x = rect2[2];
  var b_max_y = rect2[3];

  return a_min_x <= b_max_x && a_max_x >= b_min_x && a_min_y <= b_max_y && a_max_y >= b_min_y;
}

function 选区_to_矩形(选区: 选区): 矩形 {
  if (选区[0] > 选区[2] || 选区[1] > 选区[3]) {
    return [选区[2], 选区[3], 选区[0], 选区[1]];
  } else {
    return 选区;
  }
}

namespace 遮罩 {
  let list = [] as HTMLElement[];
  export function add(rect: 矩形) {
    const div = document.createElement("div");
    div.style.cssText = `position: fixed;background: gray;opacity: .3;`;
    div.style.left = rect[0] + "px";
    div.style.top = rect[1] + "px";
    div.style.width = rect[2] - rect[0] + "px";
    div.style.height = rect[3] - rect[1] + "px";
    list.push(div);
    document.body.appendChild(div);
  }
  export function remove() {
    list.forEach((el) => el.remove());
    list = [];
  }
}
