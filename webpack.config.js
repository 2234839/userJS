const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const entry = {
  "网页笔记.user.js": path.resolve(__dirname, "./网页笔记/网页笔记.user.ts"),
  "更好的我来导出.user.js": path.resolve(__dirname, "./更好的我来导出/index.user.ts"),
};

function getMeta(filePath) {
  const text = fs.readFileSync(filePath, { encoding: "utf8" });
  const meta = text.match(/\/\/ ==UserScript==[\s\S]+\/\/ ==\/UserScript==/g)[0];
  return meta;
}

module.exports = {
  mode: "development",
  entry,
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".ts", ".tsx", ".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },

      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            // emitCss: true,
            preprocess: require("svelte-preprocess")({}),
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner(options) {
        return `${getMeta(
          entry[options.chunk.id],
        )}\n// 以下代码是打包后的代码，可以去 https://github.com/2234839/userJS 查看正常代码`;
      },
      raw: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    disableHostCheck: true,
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  devtool: "inline-source-map",
};
