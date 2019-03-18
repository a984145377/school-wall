var express = require('express');
var router = express.Router();
var url = require('url');
router.get('/', function(req, res, next) {
  console.log("enne")
   var params = url.parse(req.url,true).query
   console.log(params)
});

module.exports = router;
