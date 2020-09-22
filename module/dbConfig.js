/**
 * 配置文件
 */
// 使用用户名和密码连接登录到指定数据库，格式如下：
// mongodb://admin:123456@127.0.0.1:27017/test
const dbConfig = {
  dbUrl: 'mongodb://admin:admin@127.0.0.1:27017',
  dbName: 'koa2',
}

module.exports = dbConfig
