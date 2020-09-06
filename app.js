const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const app = new Koa()
const path = require('path')
const koaNunjucks = require('koa-nunjucks-2')
const static = require('koa-static') //静态资源服务插件

// 配置静态web服务的中间件(多个);
app.use(static(path.join(__dirname, '/public')))
app.use(static(path.join(__dirname, '/static')))

// 注册 bodyParser【将上下文的 formData数据解析到 ctx.request.body的中间件】必须在 router之前被注册
app.use(bodyParser())

// 配置 koa-nunjucks-2 模板引擎中间件
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
  // 配置全局状态中间件
  ctx.state = {
    title: 'koa2实践',
    session: 'ABC123',
  }

  // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next()

  if (ctx.status == 404) {
    // 错误处理的中间件
    ctx.status = 404
    await ctx.render('404', { title: '糟糕页面丢失了~' })
  }
})

// 注册路由中间件
app.use(router())

app.listen(5000)
console.log(`app is running at port 5000...`)
