let http = require('http')
let util = require('util')

http.get('https://www.imooc.com/index/getstarlist', function (res) {
  let data = '' // 接受返回的结果
  // 监听传过来的数据，如果有数据传过来，就对数据进行累加。客户端就是这样拿数据的，并不能一次性拿完全部数据
  res.on('data', (chunk) => {
    data += chunk
  })
  // 监听
  res.on('end', () => {
    let result = JSON.parse(data);
    console.log('result:' + result.msg)
    console.log(util.inspect(result))
  })
})
