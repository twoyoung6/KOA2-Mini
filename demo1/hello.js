// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
// ctx 是 封装了 request 和 response 的 
// next 是传入的回调函数
// 原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。
// 我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
app.use(async (ctx, next) => {
  ctx.type = 'text/html' // 设置请求头类型
  ctx.body = '<h1>Hello, koa2!</h1>' // 设置 response
  await next() // 执行下一个异步函数
});
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`) // 打印URL
  await next() // 调用下一个middleware
})

app.use(async (ctx, next) => {
  const start = new Date().getTime() // 当前时间
  await next() // 调用下一个middleware
  const ms = new Date().getTime() - start // 耗费时间
  console.log(`Time: ${ms}ms`) // 打印耗费时间
})


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
