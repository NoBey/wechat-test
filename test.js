const koa = require('koa')
const app = new koa()

var OAuth = require('wechat-oauth');
var client = new OAuth('wxaaa2b046e647ea2b', '45d88f65ad72c1a24243ff562465fa52');
const ss = client.getAuthorizeURL('http://wx.noeby.cn/', 'wxoauth', 'snsapi_userinfo')
console.log(ss)


var router = require('koa-router')();

app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/',async (ctx)=>{
  console.log(ctx.request)

  ctx.body = '<a href='+ ss +'>登陆</a>'
})

router.get('/code', async(ctx) => {
  client.getAccessToken(ctx.request.qurey.code, function(err, result) {
    var accessToken = result.data.access_token;
    var openid = result.data.openid;
    client.getUser(openid, function(err, result) {
      ctx.body = result;
    });
  });
})


app.listen(80)
