/** 油猴的ajaxget */
export function gm_ajax_get(url: string, data?: any): Promise<string> {
  if (data) url += "?" + jsonToURLpar(data);
  if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM"))
    return new Promise((resolve, reject) => {
      GM.xmlHttpRequest({
        method: "GET",
        url,
        onload: function(response: any) {
          resolve(response.responseText);
        },
        onerror: reject,
      });
    });
  else
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function() {
        resolve(xhr.responseText);
      });
      xhr.addEventListener("error", reject);
      xhr.open("get", url);
      xhr.send();
    });
}
/** json 转 urlpar 只能转一层 */
function jsonToURLpar(json: any) {
  return Object.keys(json)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");
}
