/**
 * 单例模式 演示
 */
class Db {
  // 静态方法
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor() {
    console.log('实例化构造函数....')
    this.connect()
  }

  connect() {
    console.log('连接数据库....')
  }

  find(val) {
    console.log(`查询数据库${val}`)
  }
}

var db1 = Db.getInstance()
db1.find(1)
var db2 = Db.getInstance()
db2.find(2)
var db3 = Db.getInstance()
db3.find(3)
