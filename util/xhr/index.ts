declare const GM: any;
export namespace Xhr {
  type Options = {
    headers: { [k: string]: string };
  };
  class xhrAdapter {
    options = { headers: {} } as any;
    addEventListener(event: string, cb: () => void) {
      this.options["on" + event] = cb;
    }
    open(method: string, url: string) {
      this.options.method = method;
      this.options.url = url;
    }
    setRequestHeader(key: string, value: string) {
      this.options.headers[key] = value;
    }
    send() {
      console.log("[GM]", GM);
      GM.xmlHttpRequest(this.options);
    }
  }
  const isGm = Boolean(GM?.xmlHttpRequest);

  const _XMLHttpRequest = isGm ? xhrAdapter : XMLHttpRequest;

  export function get(url: string, options?: Options): Promise<string> {
    return new Promise((resolve, reject) => {
      var xhr = new _XMLHttpRequest();
      xhr.addEventListener("readystatechange", function (this: any) {
        if (this.readyState === 4) {
          resolve(this.responseText);
        }
      });
      xhr.addEventListener("error", reject);

      xhr.open("GET", url);

      if (options?.headers) {
        for (const key in options.headers) {
          const value = options.headers[key];
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.send();
    });
  }
}
