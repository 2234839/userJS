// import { Xhr } from "../util/xhr";
/** ═════════🏳‍🌈 一个用来预览 a 标签指向链接的 单例 🏳‍🌈═════════  */
export namespace uriPreview {
  type 预览结果 = {
    html: string;
  };
  type 预览错误 = {
    html: string;
  };
  export type 预览返回值 = [预览结果, null] | [null, 预览错误];
  const [res, err] = (0 as unknown) as 预览返回值;

  export type 预览者 = {
    匹配: (url: string) => boolean;
    预览: (url: string) => Promise<预览返回值>;
  };
  export const 预览者: 预览者[] = [];

  /**
   * 返回处理程序对于该 url 提取的数据
   * TODO: 这里应该加上一个缓存参数，避免对同一个 url 进行多次处理
   */
  export function 预览(a: HTMLAnchorElement) {
    return 预览者.filter((el) => el.匹配(a.href)).map((el) => el.预览(a.href));
  }

  //-------------- 各种预览程序
  const githubIssues预览: 预览者 = {
    匹配(src: string) {
      return /https:\/\/github\.com[\s\S]+\/issues\/\d+/.test(src);
    },
    async 预览(src: string) {
      try {
        // return new Promise((resolve, reject) => {
        //   var xhr = new XMLHttpRequest();
        //   xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //       console.log(this.responseText);
        //     }
        //   });
        //   xhr.open(
        //     "GET",
        //     "https://github.com/ruanyf/weekly/issues/1744/hovercard",
        //   );
        //   // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        //   xhr.send();
        // });

        return await (
          await fetch(src + "", {
            headers: new Headers({
              "X-Requested-With": "XMLHttpRequest",
            }),
          })
        )
          .text()
          .then((r) => [{ html: r }, null]);
      } catch (error) {
        return [null, { html: error }];
      }

      // return Xhr.get(src + "/hovercard", {
      //   headers: {
      //     "X-Requested-With": "XMLHttpRequest",
      //   },
      // });
    },
  };
  const 知乎预览: 预览者 = {
    匹配(src: string) {
      return src.startsWith("https://www.zhihu.com/question/");
    },
    async 预览(src: string) {
      try {
        return await (await fetch(src)).text().then((r) => [{ html: r }, null]);
      } catch (error) {
        return [null, { html: error }];
      }
    },
  };
  预览者.push(githubIssues预览, 知乎预览);
}
console.log("========= url preview =======");
