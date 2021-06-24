import App from "./App.svelte";
const box = document.createElement("div");
// box.style.cssText = `
// position: absolute;
//     z-index: 9999;
//     left: 0px;
//     top: 0px;
// `;
console.log("[box]", box);
const app = new App({
  target: box,
  props: {
    name: "world",
  },
});
document.body.append(box);
export default app;
