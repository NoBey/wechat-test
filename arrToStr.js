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
    arr[0]['身份证']=pwdnum(arr[0]['身份证'])
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
  if(arr.length>51){
    return "数据有"+arr.length+'条数据请使用 "-{num}" 来分页查询例如:姓名王大傻-1 每页显示50条数据'
  }
}

function pwdnum(num){
  return num.slice(0,10)+"*******"
}
