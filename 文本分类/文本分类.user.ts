import { Layer, Trainer, Network } from "synaptic";
import { getLocalItem, setLocalItem, deleteLocalItem } from "../util/gm/store";
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
// @grant        GM.deleteValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==
(async function () {
  class 感知机 extends Network {
    constructor(input: number, hidden: number, output: number) {
      const inputLayer = new Layer(input);
      const hiddenLayer = new Layer(hidden);
      const outputLayer = new Layer(output);
      /** 连接层 */
      inputLayer.project(hiddenLayer);
      hiddenLayer.project(outputLayer);
      super({ output: outputLayer, hidden: [hiddenLayer], input: inputLayer });
    }
  }
  const s_key = "rgzn_t1";
  //   deleteLocalItem(s_key);
  const data = (await getLocalItem(s_key)) as string;
  let p1: 感知机;
  if (data) {
    const json = JSON.parse(data);
    console.log(json);
    p1 = Network.fromJSON(json);
  } else {
    p1 = new 感知机(2, 5, 1);
  }
  console.log("深度学习网络数据", data);
  /** [导入与导出矩阵](https://github.com/cazala/synaptic/wiki/Networks) */
  //   console.log(JSON.stringify(p1.toJSON()));

  const 用户操作 = {
    p: p1,
    async train(input: number[], output: number[]) {
      /** 训练器 */
      const t = new Trainer(this.p);
      console.log(await t.trainAsync([{ input, output }]));
    },
    /** 纠正 */
    correct(input: number[], output: number[]) {
      const learningRate = 0.3;
      this.p.activate(input);
      this.p.propagate(learningRate, output);
    },
    save() {
      setLocalItem(s_key, JSON.stringify(this.p.toJSON()));
    },
  };
  (unsafeWindow as any)[s_key] = 用户操作;

  console.log(p1.activate([0, 0]));
  console.log(p1.activate([1, 0]));
  console.log(p1.activate([0, 1]));
  console.log(p1.activate([1, 1]));
  console.log("------------------");
})();
