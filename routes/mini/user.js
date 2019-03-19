var express = require('express');
var router = express.Router();
var mongodb = require("../../util/mongodb");
var wxConfig = require("../../util/wxConfig")
var util = require("../../util/util")
const request = require('request');

router.post('/login', function(req, resp, next) {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.appId}&secret=${wxConfig.secret}&js_code=${req.body.code}&grant_type=authorization_code`
  console.log(req.body)
 
  request(url,(err,res,body)=>{
    if(err){
      console.log("失败")
      // console.log(err)  {"openId":JSON.parse(body).openid}
    }else{
      console.log('成功')
      console.log(JSON.parse(body).openid);
      //暂时先用uuid代替token   openId是用户唯一标识，作用查数据表，  UUID是返回前端，之后根据UUID查数据库，把它存进数据库，然后，根据数据来查 ，以后UUID一列改为token  有JWT机制
      //   为了毕设  把token改为UUID 立即一样
      let UUID = util.UUID()
      let updateParam = {
        filter:{"openid":JSON.parse(body).openid},
        update: {$set: {"openid":JSON.parse(body).openid,"uuid": UUID}},
        other: {
          upsert : true,
        }
      } 
      mongodb.updateOne("wahaha",updateParam).then(updateRes => {
        resp.send({
          code: 200,
          data:{
            uuid : UUID
          }
        })
      })
    }
  })
});

module.exports = router;
