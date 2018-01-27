let http = require('http')
let url = require('url')
let util = require('util')
let fs = require('fs')

let server = http.createServer((req, res) => {

  var pathname = url.parse(req.url).pathname
  console.log('file:' + pathname.substring(1))
  fs.readFile(pathname.substring(1), (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data.toString())
    }
    // 注意，这个end 一定要放在读取文件的内部使用
    res.end(util.inspect(url.parse(req.url)))
  })
})

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器已经运行，请打开浏览器，输入：http：//127.0.0.1：3000/来访问')
})
