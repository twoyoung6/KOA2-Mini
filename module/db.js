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
          console.log('Connected successfully to server...')
          _this.dbClient = client.db(config.dbName)
          resolve(_this.dbClient)
        })
      } else {
        resolve(_this.dbClient)
      }
    })
  }
  // db 查询数据
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(async (db) => {
        let res = await db.collection(collectionName).find(json)
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
  // db 插入数据
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(async (db) => {
        let res = await db.collection(collectionName).insertOne(json)
        if (res.result.ok == 1) {
          console.log('新增数据成功！')
        } else {
          console.log('数据新增失败！')
        }
      })
    })
  }

  // db 更新修改数据
  update(collectionName, newJson, oldJson) {
    return new Promise((resolve, reject) => {
      this.connect().then(async (db) => {
        let res = await db
          .collection(collectionName)
          .updateOne(newJson, { $set: oldJson })
        if (res.result.ok == 1) {
          console.log('数据修改成功！')
        } else {
          console.log('数据修改失败！')
        }
      })
    })
  }

  // db 删除数据
  delete(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(async (db) => {
        let res = await db.collection(collectionName).removeOne(json)
        if (res.result.ok == 1) {
          console.log('删除数据成功！')
        } else {
          console.log('数据删除失败！')
        }
      })
    })
  }
}

module.exports = Db.getInstance()
