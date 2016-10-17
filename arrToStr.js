module.exports = function(arr){
  var data = {  学号: 'String',
     姓名: 'String',
     身份证: 'String',
     性别: 'String',
     民族: 'String',
     籍贯: 'String',
     身份: 'String',
     班级: 'String',
     高中: 'String'}
  var tmp = ''
  if(arr.length===1){
    tmp = ''

    for(key in data){
      tmp += key+'--'+arr[0][key]+'\n'
    }
    return tmp
  }
  if(arr.length===0){
    return '没有找到数据'
  }
  if(arr.length>1){
    tmp = ''
    for(var i=0; i<arr.length; i++){
     tmp+= arr[i]['学号']+'--'+arr[i]['姓名']+'--'+arr[i]['性别']+'\n'
    }
    return tmp
  }
}
