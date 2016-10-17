
var mongoose = require('mongoose'); //引用mongoose模块
var db = mongoose.createConnection('nobey.cn', 'tjcu'); //创建一个数据库连接
db.on('error',console.error.bind(console,'连接错误:'));
 db.once('open',function(){
   console.log('moogodb-open-ok')
 });
 var StudentInformationSchema = new mongoose.Schema({
   学号: String,
   姓名: String,
   身份证: String,
   性别: String,
   民族: String,
   籍贯: String,
   身份: String,
   班级: String,
   高中: String
 });
 var StudentInformationModel = db.model('StudentInformation', StudentInformationSchema);

module.exports = function(conditions, callback){
  StudentInformationModel.find(conditions,callback)
}

// StudentInformationModel.find({ 身份证:aa},function(err, data){
//   console.log(data)
// })
