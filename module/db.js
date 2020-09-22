const MongoClient = require('mongodb').MongoClient
const config = require('./dbConfig.js')

// db 类
class Db {
  static getInstance() {
    // 静态方法 单例模式，解决多次 Db 实例化不会共享的问题
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }
  constructor() {
    this.dbClient = '' // 防止数据库多次连接，消耗性能
    this.connect() // 初始化默认连接一次数据库
  }

  // 连接数据库
  connect() {
    let _this = this
    return new Promise((resolve, reject) => {
      if (!_this.dbClient) {
        MongoClient.connect(config.dbUrl, (err, client) => {
          if (err) {
            reject(err)
          }
          console.log('Connected successfully to server')
          _this.dbClient = client.db(config.dbName)
          resolve(_this.dbClient)
        })
      }
    })
  }

  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        let res = db.collection(collectionName).find(json)
        res.toArray((err, docs) => {
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }

  insert() {}

  update() {}

  delete() {}
}

module.exports = Db.getInstance()
