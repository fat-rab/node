const http = require('http')
const path = require("path");
const fs = require('fs')
const url = require("url");
const qs = require('querystring')

function notFound(req, res) {
    fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
        if (err) {
            res.write(404, 'notFound')
            res.end()
        } else {
            res.writeHead(404, {"Context-TYpe": "text/html,charset:'UTF-8'"})
            res.write(data)
            res.end()
        }
    })
}

const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, 'http://127.0.0.1')
    //console.log(myUrl, 'myUrl')
    if (req.method === 'GET') {
        let query = myUrl.search.substring(1)
        // console.log(query, 'query') //'test=1'
        const resData = {
            code: 200,
            data: 'node',
            msg: 'success'
        }
        res.end(JSON.stringify(resData))
        return
    }
    if (req.method === 'POST') {
        const contentType = req.headers['content-type']
        if (contentType === 'application/json') {
            let data = ''
            req.on('data', chunk => {
                data += chunk
                // 可以在此处存储数据
            })
            req.on('end', () => {
                res.end(data)
            })
        }
    }
    let pathName = myUrl.pathname
    if (pathName === '/') {
        pathName = path.join(__dirname, 'index.html')
    }
    // 获得pathName 后缀
    const extName = path.extname(pathName)
    if (extName === '.html') {
        fs.readFile(pathName, (err, data) => {
            if (err) {
                notFound(req, res)
            } else {
                res.writeHead(200, {"Context-TYpe": "text/html,charset:'UTF-8'"})
                res.write(data)
                res.end()
            }
        })
    }
    // res.writeHead(200)
    // res.write('hello')
    // res.end()
})

server.listen(8888)
