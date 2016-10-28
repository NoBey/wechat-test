var pa = require('./pa.js')
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

  request.get('http://202.113.80.18:7777/pls/wwwbks/bks_login2.login')
  .charset('gbk')
  .end((err, res) => {
    console.log(res.text)
  })



  function duplicates(arr) {
    var tmp = {}
    var data = []
    for (var i = 0; i < arr.length; i++) {
      if (tmp[arr[i]] != undefined) {
        if (data.indexOf(arr[i]) == -1) {
            data.push(arr[i]);
            continue
          }
          continue
        }

        if (tmp[arr[i]] == undefined) {
          tmp[arr[i]] = 0;
          continue
        }
      }

      return data
    }
