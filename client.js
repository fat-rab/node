// 假设回显服务器正在监听端口 8000。
const https = require('https');
const fs = require('fs');

const options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: '/',
    method: 'GET',
    // rejectUnauthorized: false,
    key: fs.readFileSync('keys/client.key'),
    cert: fs.readFileSync('keys/client.pem'),
    ca: [fs.readFileSync('keys/ca.pem')],

};
options.agent = new https.Agent(options)

const req = https.request(options, (res) => {
    res.setEncoding('utf-8')
    res.on('data', (chunk) => {
        console.log(chunk)
    })
});
req.on('error', (e) => {
    console.log(e)
})
