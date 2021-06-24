var exec = require("child_process").execSync;
const fs = require("fs");
function run(str) {
  process.stdout.write(exec(str));
}

const project = [
  "./祭奠百度/祭奠百度.user.ts",
  "./自动同步文章/自动同步文章.ts",
  "./api自动提取/api自动提取.user.ts",
  "./文本分类/文本分类.user.ts",
  "./去除顶部遮挡/去除顶部遮挡.user.ts",
  "./高级复制/高级复制.user.ts",
];
project.forEach((el) => {
  run(`npx parcel build --no-source-maps ${el}`);
});
run(`npm run build`);

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
      const outFilePath = "./dist/" + file;
      const code = fs.readFileSync(outFilePath).toString("utf-8");
      fs.writeFileSync(outFilePath, getMeta(path) + code);
    });
});
function getMeta(filePath) {
  const text = fs.readFileSync(filePath, { encoding: "utf-8" });
  const meta = text.match(/\/\/ ==UserScript==[\s\S]+\/\/ ==\/UserScript==/g)[0];

  return `${meta}\n// 这些代码都来自github actions 编译后的代码，不编译版本体积太大，不放心的欢迎去 https://github.com/2234839/userJS 审查代码, \n\n`;
}
