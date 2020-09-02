const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// 注册 bodyParser，必须在 router之前被注册
app.use(bodyParser());

// 匹配任何路由（应用级中间件）类似于全局守卫
app.use(async (ctx, next) => {
	console.log(`Process ${ctx.method} ${ctx.url}`);
	await next(); // 继续执行下面的路由匹配
});

// 匹配具体路由，（路由级中间件）类似于局部守卫
// 根据不同的 URL 处理不同的函数
router.get('/', async (ctx, next) => {
	ctx.response.body = `<h1>this is Home 主页</h1>
  <form action="/login" method="post">
    <p>Name: <input name="name" value="admin"></p>
    <p>Password: <input name="password" type="password"></p>
    <p><input type="submit" value="Submit"></p>
  </form>`;
});

router.post('/login', async (ctx, next) => {
	var name = ctx.request.body.name,
		pw = ctx.request.body.password;
	if (name == 'koa' && pw == '666') {
		ctx.response.body = `<h1>欢迎 ${name}!</h1>`;
	} else {
		ctx.response.body = `<h1>登录失败，请返回重新登录！</h1>
    <p><a href="/">重新登录</a></p>`;
	}
});

router.get('/hello/:name', async (ctx, next) => {
	var name = ctx.params.name;
	ctx.response.body = `<h2>HAHA，<em>${name}</em></h2>`;
});
// 注册路由中间件
app.use(router.routes());

app.listen(4000);
console.log(`app is running at port 4000...`);
