## 请求代理

通过在这里写 js 代码，插件内部会调用该代码来处理请求的 url，从而实现像生产的网站访问自己本地服务这样的效果，例如将下面的代码改为下面这样的，所有请求就都会发往本机服务了，要记得允许跨域

```javascript
(url) => {
    return  url.replace('http://domain','http://127.0.0.1');
}
```

![效果图](./doc/效果图.jpg)

每一次请求都会执行这个函数，会将原始请求的url作为参数传入，将函数返回的结果替换原始请求的url

这里其实只做了一件很简单的事情，但我觉得对后端开发调试很友好