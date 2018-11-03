/**
 * 启动服务器
 */
//引入服务器
const mongoose = require('mongoose');
//获取Schema
const Schema = mongoose.Schema;
// 创建约束对象
const usersSchema = new Schema({
    username:{
      type: String,
      unique: true,
      required: true
    },
    password:{
      type: String,
      required: true
    },
    type:{
    type: String,
    required: true
  }
})

const Users = mongoose.model('Users',usersSchema);
// 暴露出去
module.exports = Users;
