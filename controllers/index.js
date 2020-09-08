var fn_sign = async (ctx, next) => {
  await ctx.render('sign')
}

var fn_doSign = async (ctx, next) => {
  var name = ctx.request.body.name || '',
    pw = ctx.request.body.password || ''
  if (name == 'koa' && pw == '666') {
    let arr = [
      {
        key: 'name',
        value: ctx.request.body.name,
      },
      {
        key: 'password',
        value: ctx.request.body.password,
      },
    ]
    // cookie 中间件
    ctx.cookies.set('name', ctx.request.body.name, {})
    ctx.cookies.set('password', ctx.request.body.password, {
      path: '',
      domain: '',
      expires: '', // max-age
      httpOnly: true,
      secure: '',
    })

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
