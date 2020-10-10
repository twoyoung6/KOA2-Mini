const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const app = new Koa()
const path = require('path')
const koaNunjucks = require('koa-nunjucks-2')
const static = require('koa-static') //静态资源服务插件
const session = require('koa-session') // session 中间件
const CONFIG = require('./config.js')

// ==============配置静态web服务的中间件(多个);==============
app.use(static(path.join(__dirname, '/public')))
app.use(static(path.join(__dirname, '/static')))

// ==============配置 session 中间件==============
app.keys = ['some secret hurr']
app.use(session(CONFIG, app))

// 注册 bodyParser【请求体 ctx.request.body 数据格式化的中间件】必须在 router之前被注册（koa 洋葱模型决定的）
app.use(bodyParser())
// var myDb = require('./module/db.js')

// // 新增
// async function add() {
//   await myDb.insert('koa2', { userName: '袁隆平', age: 79 })
// }
// add()
// // 修改数据
// async function update() {
//   await myDb.update('koa2', { userName: 'name0' }, { userName: '钱学森' })
// }
// update()
// // 删除数据
// async function remove() {
//   await myDb.update('koa2', { userName: '袁隆平' })
// }
// remove()

// ==============配置 koa-nunjucks-2 模板引擎中间件==============
app.use(
  koaNunjucks({
    ext: 'html', // 使用HTML后缀的模板
    path: path.join(__dirname, 'views'), // 模板所在路径
    nunjucksConfig: {
      // nunjucks的配置
      trimBlocks: true,
    },
  })
)

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') return
  // 配置全局状态中间件
  ctx.state = {
    title: 'koa2实践',
    session: 'ABC123',
  }

  // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next()

  if (ctx.status == 404) {
    // ==============错误处理的中间件==============
    ctx.status = 404
    await ctx.render('404', { title: '糟糕页面丢失了~' })
  }
})

// ==============注册路由中间件==============
app.use(router())

app.on("error", (err, ctx) => {// 捕获异常记录错误日志
  console.log(new Date(), ":", err);
});

app.listen(5000)
console.log(`app is running at port 5000...`)
