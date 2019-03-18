const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";
var dbase;
function connect(){
  return new Promise((resolve, reject)=>{
    MongoClient.connect(url, {useNewUrlParser:true},function(err, db) {
      if (err){
        reject()
        throw err
      }else{
        dbase = db.db("test");
        resolve(db)
      };    
    });
  })
};
mongodb = {
  insertOne(col,params){
    return new Promise((resolve,reject)=>{
      connect().then((db)=>{
        let collection = dbase.collection(col);
        collection.insertOne(params,(err,res)=>{
          if(err){
            db.close();
            reject();
          }else{
            db.close();
            resolve("code:200")
          };
        })
      })
    })
  },
  findAll(col,param = {}){
    return new Promise((resolve,reject)=>{
      connect().then(db=>{
        let collection = dbase.collection(col);
        collection.find(param).toArray((err,res)=>{
          db.close();
          console.log(res)
          resolve(res)        
        });
      })
    })
  }
}
module.exports = mongodb