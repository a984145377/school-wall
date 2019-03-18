var express = require('express');
var router = express.Router();
var mongodb = require("../../util/mongodb")

router.post('/speak', function(req, res, next) {
  let params = req.body
  mongodb.findAll("wahaha",{type:params.type}).then((result)=>{
    res.send({
      code:200,
      data:JSON.stringify(result),
      text:"查询成功"  
    })
  })
});
router.post('/publishSpeak', function(req, res, next) {
  let params = req.body
  console.log(JSON.stringify(params));
  mongodb.insertOne("wah8aha",params).then((code)=>{
    res.send({
      code:200,
      data:{},
      text:"发布成功"
    })    
  });
  
});

module.exports = router;
