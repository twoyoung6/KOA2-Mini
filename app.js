const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();

// 注册 bodyParser，必须在 router之前被注册
app.use(bodyParser());

app.use(async (ctx, next) => {
	// console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
	if (ctx.status == 404) {
		// 错误处理的中间件
		ctx.status = 404;
		ctx.body = `<h3>404 页面</h3>`;
	}
});

// 注册路由中间件
app.use(controller());

app.listen(5000);
console.log(`app is running at port 5000...`);
