
/**
 * 连接主体
 */
//引入服务器
const express = require('express');
// 引入数据库
const db = require('./db');
const router = require('./router');


//创建app应用对象
const app = express();
//使用路由
app.use(router);

//监听端口号
app.listen(4000, err => {
  if(!err) console.log('服务器连接成功');
  else console.log(err);
})