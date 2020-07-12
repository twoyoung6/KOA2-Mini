var fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>index</h1>
  <form action="/signin" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
  </form>`;
};

var fn_signin = async (ctx, next) => {
  var name = ctx.request.body.name || '',
  pw = ctx.request.body.password || '';
  if (name == 'koa' && pw == '666') {
    ctx.response.body = `<h1>欢迎 ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>登录失败，请返回重新登录！</h1>
    <p><a href="/">重新登录</a></p>`
  }
}

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
}
