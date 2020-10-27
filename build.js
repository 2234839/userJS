var exec = require("child_process").execSync;
const fs = require("fs");
function run(str) {
  process.stdout.write(exec(str));
}

const project = [
  "./祭奠百度/祭奠百度.user.ts",
  "./请求代理/请求代理.user.ts",
  "./自动同步文章/自动同步文章.ts",
  "./api自动提取/api自动提取.user.ts",
  "./文本分类/文本分类.user.ts",
  "./去除顶部遮挡/去除顶部遮挡.user.ts",
  "./请求代理/请求代理.user.ts",
  "./高级复制/高级复制.user.ts",
];
project.forEach((el) => {
  run(`npx parcel build --no-minify --no-source-maps ${el}`);
});
run(`npm run buildAll`);

console.log("--编译完成--开始生成 banner ---");

fs.readdir("./dist/", (err, files) => {
  files
    .filter((path) => path.endsWith("user.js"))
    .forEach((file) => {
      const name = file.slice(0, -8);
      let path = `./${name}/${name}.user.ts`;
      try {
        fs.statSync(path);
      } catch (error) {
        path = `./${name}/index.user.ts`;
      }
      console.log(file, getMeta(path));
    });
});
function getMeta(filePath) {
  const text = fs.readFileSync(filePath, { encoding: "utf8" });
  const meta = text.match(/\/\/ ==UserScript==[\s\S]+\/\/ ==\/UserScript==/g)[0];

  return `${meta}\n// 以下代码是打包后的代码，可以去 https://github.com/2234839/userJS 查看正常代码`;
}
