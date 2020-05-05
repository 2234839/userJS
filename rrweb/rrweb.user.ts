import { record, Replayer } from "rrweb";
import { eventWithTime } from "rrweb/typings/types";
// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.38
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==
(async function () {
  const events = [] as eventWithTime[];
  const stopFn = record({
    emit(event) {
      events.push(event);
      if (events.length > 100) {
        // 当事件数量大于 100 时停止录制
        stopFn();
        console.log(events);

        const replayer = new Replayer(events);
        replayer.play();
      }
    },
  });
})();
