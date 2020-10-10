var DbClient = require('../module/db.js')

// 用户列表页
var fn_userList = async (ctx, next) => {
  let loginStatus = !!ctx.session.token
  // Db查询操作
  let result = await DbClient.find('koa2', {})
  await ctx.render('userList', { list: result, loginStatus: loginStatus }) // 模板引擎渲染数据
}

// 新增用户
var fn_addUser = async (ctx, next) => {
  await ctx.render('addUser', {})
}

// 新增操作
var fn_doAddUser = async (ctx, next) => {
  let data = ctx.request.body
  let param = {
    ...data,
    id: `${Math.round(Math.random() * 1000)}`,
  }
  // Db查询操作
  let res = await DbClient.insert('koa2', param)
  try {
    if (res.result.ok == 1) {
      ctx.redirect('userList')
    }
  } catch (error) {
    ctx.redirect('addUser')
  }
}

// 编辑页面
var fn_editUser = async (ctx, next) => {
  let idx = ctx.query
  let data = await DbClient.find('koa2', { id: idx.id })
  await ctx.render('editUser', { form: data[0] })
}
// 编辑操作
var fn_doEditUser = async (ctx, next) => {
  try {
    let params = ctx.request.body
    console.log(params)
    let res = await DbClient.update(
      'koa2',
      { id: params.id },
      { userName: params.userName, age: params.age, id: params.id }
    )
    if (res.result.ok == 1) {
      ctx.redirect('userList')
    }
  } catch (error) {
    console.error(error)
    ctx.redirect('editUser')
  }
}

// 删除用户
var fn_deleUser = async (ctx, next) => {
  try {
    let params = ctx.query
    let res = await DbClient.delete('koa2', { id: params.id })
    if (res.result.ok == 1) {
      ctx.redirect('userList')
    }
  } catch (error) {
    ctx.redirect('userList')
  }
}

module.exports = {
  'GET /userList': fn_userList,
  'GET /addUser': fn_addUser,
  'POST /doAddUser': fn_doAddUser,
  'GET /editUser': fn_editUser,
  'POST /doEditUser': fn_doEditUser,
  'GET /deleteUser': fn_deleUser,
}
