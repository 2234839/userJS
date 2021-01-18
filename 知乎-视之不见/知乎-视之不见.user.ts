// ==UserScript==
// @name         知乎-视之不见
// @namespace    https://shenzilong.cn.net/
// @version      0.0.1
// @description  从qq邮箱导出邮件
// @author       崮生 2234839456@qq.com
// @include      *://mail.qq.com*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==
import "./视之不见.css";
export async function main() {
  /** 表示这个元素已经被处理过了 */
  const IdentifiedFlag = "-identified";
  /** 不看这条 */
  const NoSeeFlag = "-no_see";

  /** ═════════🏳‍🌈 评论 🏳‍🌈═════════  */
  function commentFilter() {
    const CommentList = Array.from(
      document.querySelectorAll(`.CommentItemV2:not(.${IdentifiedFlag})`),
    ) as HTMLDivElement[];
    if (CommentList.length > 0) {
      console.log("[CommentList]", CommentList);
    }

    CommentList.forEach((commentDiv) => {
      const userLinkA = commentDiv.querySelector(
        ".UserLink-link",
      ) as HTMLAnchorElement;
      commentDiv.classList.add(IdentifiedFlag);
      const className = screening(userLinkA);
      if (className) {
        commentDiv.classList.add(className);
      }
    });

    /** ═════════🏳‍🌈 回答 🏳‍🌈═════════  */
    (Array.from(
      document.querySelectorAll(`.Card:not(.${IdentifiedFlag})`),
    ) as HTMLDivElement[]).forEach((commentDiv) => {
      const userLinkA = commentDiv.querySelector(
        ".AuthorInfo .UserLink-link",
      ) as HTMLAnchorElement;
      commentDiv.classList.add(IdentifiedFlag);
      const className = screening(userLinkA);
      if (className) {
        commentDiv.classList.add(className);
      }
    });
  }

  setInterval(() => {
    commentFilter();
  }, 20);
}
main();

const userTable = {
  "-no_see": [],
  "-px5": [
    /** 不知所云，女权 */ "charon-93-52-47-86",
    /** 测试 */ "yang-leonier",
  ],
} as { [k: string]: string[] };
function screening(useLink: string | HTMLAnchorElement) {
  let link: string;
  if (useLink instanceof HTMLAnchorElement) {
    link = useLink.href;
  } else {
    link = useLink || "";
  }
  const id = link.split("/").pop()!;

  for (const key in userTable) {
    if (Object.prototype.hasOwnProperty.call(userTable, key)) {
      const list = userTable[key as keyof typeof userTable];
      if (list.includes(id)) {
        return key;
      }
    }
  }

  return "";
}
