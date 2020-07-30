var exec = require("child_process").execSync;
function run(str) {
  process.stdout.write(exec(str));
}

const project = [
  "./祭奠百度/祭奠百度.user.ts",
  "./请求代理/请求代理.user.ts",
  "./自动同步文章/自动同步文章.ts",
  "./网页笔记/网页笔记.user.ts",
  "./api自动提取/api自动提取.user.ts",
  "./文本分类/文本分类.user.ts",
  "./去除顶部遮挡/去除顶部遮挡.user.ts",
  "./请求代理/请求代理.user.ts",
  "./高级复制/高级复制.user.ts",
];
project.forEach((el) => {
  run(`npx parcel@next build --no-minify --no-source-maps ${el}`);
});
