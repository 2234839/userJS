// ==UserScript==
// @name         qq邮件导出
// @namespace    https://shenzilong.cn.net/
// @version      0.0.1
// @description  从qq邮箱导出邮件
// @author       崮生 2234839456@qq.com
// @include      *://mail.qq.com*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// @run-at       document-end

// ==/UserScript==
const q = (selector: string, d: Document | Element = document) => Array.from(d.querySelectorAll(selector));

let sid = "";

export async function main() {
  /** qq 邮箱的工具条  */
  const mainFrame = q("iframe#mainFrame")[0]! as HTMLIFrameElement;
  mainFrame.addEventListener("load", () => {
    const toolList = q(".toolbg>.left", mainFrame.contentDocument!)[0];

    const 导出按钮 = document.createElement("a");

    导出按钮.classList.add(...((q("a", toolList)[0] as any) as HTMLElement).classList);
    导出按钮.textContent = "导出所有邮件";

    toolList.appendChild(导出按钮);

    导出按钮.addEventListener("click", 导出_action);

    sid = q("a.toptitle:nth-child(1)")![0]
      .getAttribute("href")!
      .match(/sid=(.*?)&/)![1];
  });
}
setTimeout(() => {
  main();
}, 1 * 1000);

async function 导出_action() {
  for await (const iterator of generatorMailId()) {
    console.log("[iterator]", iterator);
  }
}
async function* generatorMailId(): AsyncGenerator<string[]> {
  while (true) {
    yield getCurrentMailId();
    const r = await 翻页();
    if (r !== true) {
      break;
    }
  }
  console.log("全部处理完成");

  function getCurrentMailId() {
    const mailId = q("span[mailid]", getMainDoc()).map((el) => el.getAttribute("mailid"));
    return mailId;
  }
  function getMainDoc() {
    const mainFrame = q("iframe#mainFrame")[0]! as HTMLIFrameElement;
    return mainFrame.contentDocument!;
  }
  function 翻页(): Promise<NotNextBtnError | true> {
    return new Promise((resolve, reject) => {
      const nextBtn = getNextBtn();
      if (!nextBtn) {
        return resolve(new NotNextBtnError("没有下一页了"));
      }
      nextBtn.click();
      const oldStr = getEL().textContent;
      const id = setInterval(() => {
        const el = getEL();

        const 跳转按钮 = q("div.toolbg:nth-child(19) > div:nth-child(1) > a:nth-child(6)", getMainDoc())[0];

        if (el && oldStr !== getEL().textContent && 跳转按钮) {
          clearInterval(id);
          setTimeout(() => {}, 500);
          resolve(true);
        }
      }, 100);
    });
    function getNextBtn() {
      return q("#nextpage", getMainDoc())[0] as HTMLElement;
    }
    function getEL() {
      return q("div.toolbg:nth-child(19) > div:nth-child(1)", getMainDoc())[0];
    }
  }
  //
}

class NotNextBtnError extends Error {}
