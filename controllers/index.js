const session = require('koa-session')

var fn_sign = async (ctx, next) => {
  let loginStatus = !!ctx.session.token
  await ctx.render('sign', { loginStatus: loginStatus })
}

var fn_doSign = async (ctx, next) => {
  var name = ctx.request.body.name || '',
    pw = ctx.request.body.password || ''

  if (name == 'koa' && pw == '666') {
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
    await ctx.render('dosign', { items: arr })
  } else {
    ctx.response.body = `<h1>登录失败，请返回重新登录！</h1>
    <p><a href="/sign">重新登录</a></p>`
  }
}

module.exports = {
  'GET /sign': fn_sign,
  'POST /doSign': fn_doSign,
}
