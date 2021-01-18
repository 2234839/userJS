// ==UserScript==
// @name         qq邮件导出
// @namespace    https://shenzilong.cn.net/
// @version      0.0.1
// @description  从qq邮箱导出邮件
// @author       崮生 2234839456@qq.com
// @include      *://mail.qq.com*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==

export async function main() {
  const list = [];
  const q = (selector: string, d: Document = document) => Array.from(d.querySelectorAll(selector));
  const sid = q("a.toptitle:nth-child(1)")![0]
    .getAttribute("href")!
    .match(/sid=(.*)?\&/)![1];

  function getCurrentMailId() {
    const mainFrame = q("iframe#mainFrame")[0]! as HTMLIFrameElement;
    const mailId = q("span[mailid]", mainFrame.contentDocument!).map((el) => el.getAttribute("mailid"));
    return mailId;
  }

  console.log(sid, getCurrentMailId());
}
main();
