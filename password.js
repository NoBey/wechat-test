
// http://202.113.80.18:7777/pls/wwwbks/qcb.table_browse?ctable=XK_MMB&ntable_type=1&ccolumns=*&nrow_min=1&nrow_max=3&cclauses=WHERE%20XH=%2720143668%27
const charset = require('superagent-charset');
const request = require('superagent');
var cheerio = require('cheerio')
charset(request);
var url =  "http://202.113.80.18:7777/pls/wwwbks/qcb.table_browse?ctable=XK_MMB&ntable_type=1&ccolumns=*&nrow_min=1&nrow_max=100&cclauses=WHERE XH='"

function findPassword(xh, callback){
  return request.get(url+xh+"'")
    .charset('gbk')
    .end((err, res) => {
      var $ = cheerio.load(res.text)
      var password=$('tr').find('td').eq(1).text()
      console.log(xh+'---'+password)
      callback(password)
           });
}

module.exports = findPassword
