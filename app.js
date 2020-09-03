const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();
const path = require('path');
const koaNunjucks = require('koa-nunjucks-2');
const static = require('koa-static'); //静态资源服务插件

// 注册 bodyParser，必须在 router之前被注册
// app.use(bodyParser());

// 配置 koa-nunjucks-2 模板中间件
app.use(
	koaNunjucks({
		ext: 'html', // 使用HTML后缀的模板
		path: path.join(__dirname, 'views'), // 模板所在路径
		nunjucksConfig: {
			// nunjucks的配置
			trimBlocks: true,
		},
	}),
);

// 配置静态web服务的中间件(多个);
app.use(static(path.join(__dirname, '/static')));
app.use(static(path.join(__dirname, '/public')));

app.use(async (ctx, next) => {
	// console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
	if (ctx.status == 404) {
		// 错误处理的中间件
		ctx.status = 404;
		await ctx.render('404');
	}
});

// 注册路由中间件
app.use(controller());

app.listen(5000);
console.log(`app is running at port 5000...`);
