/**
 * 创建路由器：判断是否用户注册的用户名是否重复
 */
// 引入模块
const express = require('express');
const md5 = require('blueimp-md5');
//引入users
const Users = require('../modles/user');
//获取路由
const Router = express.Router;
//创建路由器对象
const router = new Router();
// 解析请求体对象
router.use(express.urlencoded({extended:true}))
//登录
router.post('/login', async (req, res) => {
  //1.收集信息
  const {username, password} = req.body;
  //2.判断用户细信息是否合法
  if(!username ||!password){
    // 用户不合法
    res.json({
      "code": 2,
      "msg": "用户输入不合法"
    })
  }
  // 3.去数据库查找用户是否存在
  try{
    const data = await Users.findOne(username,{password:md5(password)});
    //说明用户可以查到
    if(data){
      // 说明用户找到了，返回响应成功数据
      res.json({
        "code": 0,
        "data": {
          _id: data.id,
          username: data.username,
          type: data.type,
        }
      })
    }else{ //说明用户名或密码错误
      res.json({
        "code": 1,
        "msg": "用户名或密码错误"
      })
    }
  }catch(e){
    res.json({
      "code": 3,
      "msg": "网络不稳定，请重新试试~"
    })
  }

})
//注册
router.post('/register', async (req, res) => {
  //1:收集提交信息
  const {username, password, type} = req.body;
  console.log(username, password, type);
  //2.判断用户输入是否合法
  if(!username || !password || !type){
    //说明有数据不合法 使用json是将js对象转换成json字符串，计算机智能识别字符串
    res.json({
      "code": 2,
      "msg": "用户输入不合法"
    });
    //用户名输入不合法就要禁止掉执行的
    return;
  }
  // 3. 去数据库中查找是否有指定用户
  try{
    const data =await Users.findOne({username});//username:是对象的简写属性
    if(data){
      // 返回错误,用户名已存在
      res.json({
        "code": 1,
        "msg": "此用户已存在"
      })
    } else{
      //创建用户
      const data = await Users.create({username, password: md5(password), type});
      //返回成功的响应
      res.json({
        "code": 0,
        "data": {
          "_id": data.id,
          "username": data.username,
          "type": data.type
        }
      })
    }
  }catch(e){  //返回系统错误信息
    res.json({
        "code": 3,
        "msg": "网络不稳定，请重新试试~"
    })
  }
  // res.send('register路由请求');//测试服务器和数据库
})

//暴露出去
module.exports = router;
