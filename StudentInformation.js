
var mongoose = require('mongoose'); //引用mongoose模块
var db = mongoose.createConnection('nobey.cn', 'tjcu'); //创建一个数据库连接
db.on('error',console.error.bind(console,'连接错误:'));
 db.once('open',function(){
   //一次打开记录
   console.log('ok')
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


StudentInformationModel.find({ 身份证:/^411403/},function(err, data){
  console.log(data)
})
