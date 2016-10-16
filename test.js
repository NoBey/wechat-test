var pa = require('./pa.js')
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

  request.get('http://202.113.80.18:7777/pls/wwwbks/bks_login2.login')
  .charset('gbk')
  .end((err, res) => {
    console.log(res.text)
  })
