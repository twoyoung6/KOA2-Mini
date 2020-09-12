const session = require('koa-session')
// 默认首页
var fn_home = async (ctx, next) => {
  let loginStatus = !!ctx.session.token
  await ctx.render('index', { loginStatus: loginStatus })
}
// 登录页
var fn_login = async (ctx, next) => {
  let loginStatus = !!ctx.session.token
  await ctx.render('login', { loginStatus: loginStatus })
}
// 登录状态展示页
var fn_doLogin = async (ctx, next) => {
  var name = ctx.request.body.name || '',
    pw = ctx.request.body.password || ''

  if (name == 'twoyoung' && pw == '666') {
    let arr = [
      {
        key: 'name',
        value: name,
      },
      {
        key: 'password',
        value: pw,
      },
    ]
    // ==============cookie 中间件==============
    ctx.cookies.set('name', name, {})
    ctx.cookies.set('password', pw, {
      path: '',
      domain: '',
      expires: '', // max-age
      httpOnly: true,
      secure: '',
    })
    // 生成 session
    ctx.session.token = `${name}-_-||${pw}`
    await ctx.render('doLogin', { items: arr })
  } else {
    ctx.response.body = `<h1>登录失败，请返回重新登录！</h1>
    <p><a href="/login">重新登录</a></p>`
  }
}

module.exports = {
  'GET /': fn_home,
  'GET /login': fn_login,
  'POST /doLogin': fn_doLogin,
}
