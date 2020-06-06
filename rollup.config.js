import rollupTypescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
// parcel  .\网页笔记\网页笔记.user.ts
// parcel  .\祭奠百度\祭奠百度.user.ts
// parcel  .\api自动提取\api自动提取.user.ts
// parcel  .\rrweb\rrweb.user.ts
// parcel  .\文本分类\文本分类.user.ts
// parcel  .\去除顶部遮挡\去除顶部遮挡.user.ts
export default {
  //   input: "./去除顶部遮挡/去除顶部遮挡.user.ts",
  //   input: "./请求代理/请求代理.user.ts",
  //   input: "./祭奠百度/祭奠百度.user.ts",
  input: "./ansi_to_html/ansi_to_html.user.ts",
  output: {
    dir: "./dist/",
    format: "iife",
  },
  plugins: [
    postcss({
      extensions: [".css"],
    }),
    rollupTypescript(),
    resolve(),
    commonjs(),
  ],
};
