import { Xhr } from "../util/xhr";

/** ═════════🏳‍🌈 一个用来预览 a 标签指向链接的 单例 🏳‍🌈═════════  */
export namespace uriPreview {
  export async function start(a: HTMLAnchorElement) {
    if (githubIssuesParse.is(a.href)) {
      const html = await githubIssuesParse.parse(a.href);
      console.log("[html]", html);
      return html;
    }
  }
  const githubIssuesParse = {
    is(src: string) {
      return /https:\/\/github\.com[\s\S]+\/issues\/\d+/.test(src);
    },
    parse(src: string): Promise<string> {
      return Xhr.get(src + "/hovercard", {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
    },
  };
}
