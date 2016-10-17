module.exports = function(arr){
  var tmp = ''
  if(arr.length===1){
    tmp = ''
    for(key in arr[0]){
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
