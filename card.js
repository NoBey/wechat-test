const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

request.get('http://card.tjcu.edu.cn/homeLogin.action')
      // .type('form')
      // .send({ "Login.Token1": '20142510', "Login.Token2": '111111' })
      .charset('gbk')
      .end((err, res) => {
        // cookies = res.request.cookies
        // console.log(res.request.cookies)
        console.log(res.text)
        })
