const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

request.agent().post('http://202.113.80.18:7777/pls/wwwbks/bks_login2.login?')
      .type('form')
      .send({ stuid: '20142510', pwd: '123456' })
      .charset('gbk')
      .end((err, res) => {
        cookies = res.request.cookies
        console.log(res.request.cookies)

        })
