import { flag } from "../flag.enum";

export const 知乎答案不见 = function (el: Element, data: string[]) {
  const user = el.querySelector<HTMLAnchorElement>(".UserLink-link");
  if (user) {
    data.forEach((s) => {
      const [id] = s.split(",");
      if (id !== "" && user.href.endsWith(id)) {
        el.classList.add(flag.色块5px);
      }
    });
  }
};
