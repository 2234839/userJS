const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const entry = {
  "网页笔记.user.js": path.resolve(__dirname, "./网页笔记/网页笔记.user.ts"),
  "更好的我来导出.user.js": path.resolve(__dirname, "./更好的我来导出/index.user.ts"),
  "请求代理.user.js": path.resolve(__dirname, "./请求代理/请求代理.user.ts"),
  "uri_preview.user.js": path.resolve(__dirname, "./uri_preview/uri_preview.user.ts"),
  "讯飞文字转语音提取链接.user.js": path.resolve(__dirname, "./讯飞文字转语音提取链接/index.user.ts"),
};

function getMeta(filePath) {
  const text = fs.readFileSync(filePath, { encoding: "utf8" });
  const meta = text.match(/\/\/ ==UserScript==[\s\S]+\/\/ ==\/UserScript==/g)[ 0 ];
  return meta;
}

module.exports = {
  mode: "development",
  mode: "production",
  optimization: {
    usedExports: true,

  },
  entry,
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "./dist"),
    sourceMapFilename: "[file].map", // Default
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [ ".ts", ".tsx", ".mjs", ".js", ".svelte" ],
    mainFields: [ "svelte", "browser", "module", "main" ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "@babel/preset-env" ],
          },
        },
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
  devtool: "source-map",
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
};

function censor(censor) {
  var i = 0;

  return function (key, value) {
    if (i !== 0 && typeof censor === "object" && typeof value == "object" && censor == value) return "[Circular]";

    if (i >= 29)
      // seems to be a harded maximum of 30 serialized objects?
      return "[Unknown]";

    ++i; // so we know we aren't using the original object anymore

    return value;
  };
}

function simpleStringify(object) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[ prop ] == "object") {
      continue;
    }
    if (typeof object[ prop ] == "function") {
      continue;
    }
    simpleObject[ prop ] = object[ prop ];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
}
