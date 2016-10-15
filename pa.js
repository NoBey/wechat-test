const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

// http://202.113.80.18:7777/pls/wwwbks/bks_xj.xjcx  个人学籍信息

// http://202.113.80.18:7777/pls/wwwbks/bks_login2.login 登录
// stuid:20142510
// pwd:123456

// cookies 获取
// request.agent().post('http://202.113.80.18:7777/pls/wwwbks/bks_login2.login?')
//       .type('form')
//       .send({ stuid: '20142510', pwd: '123456' })
//       .charset('gbk')
//       .end((err, res) => {
//         console.log(res.request.cookies)
//             });
var cookies = 'ACCOUNT=201425101016022019'
 request.get('http://202.113.80.18:7777/pls/wwwbks/bks_xj.xjcx')
   .set('Cookie', cookies)
   .charset('gbk')
   .end((err, res) => {
      console.log(res.text)
          });
