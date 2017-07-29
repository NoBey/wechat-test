var OAuth = require('wechat-oauth');
var client = new OAuth('wxaaa2b046e647ea2b', '45d88f65ad72c1a24243ff562465fa52');
const ss = client.getAuthorizeURL('http://wx.noeby.cn/', 'wxoauth', 'snsapi_userinfo')
console.log(ss)
