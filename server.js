const http = require('http')
const queryString = require('querystring')
const server = http.createServer((req, res) => {
    const method = req.method
    const cookie = req.headers.cookie
    parseCookie(cookie)
    //const url = req.url
    const query = queryString.parse(req.url.split("?")[1])
})


function parseCookie(cookie) {
    const cookies = {}
    if (cookie) {
        const list = cookie.split(";")
        list.forEach((item) => {
            const pair = item.split("=")
            cookies[pair[0].trim()] = pair[1]
        })
    }
    return cookies
}

const serialize = function (option) {
    const pairs = []
    const opt = option || {}
    if (opt.maxAge) pairs.push(`Max-Age=${opt.maxAge}`)
    if (opt.domain) pairs.push(`Max-Age=${opt.domain}`)
    if (opt.path) pairs.push(`Max-Age=${opt.path}`)
    if (opt.expires) pairs.push(`Max-Age=${opt.expires}`)
    if (opt.httpOnly) pairs.push(`Max-Age=${opt.httpOnly}`)
    if (opt.secure) pairs.push(`Max-Age=${opt.secure}`)
    return pairs.join(',')
}

const sessions = {}
const key = 'session_id'
const EXPIRES = 20 * 60 * 1000

const generate = function () {
    const session = {}
    session.id = (new Date().getTime()) + Math.random()
    session.cookie = {
        expire: (new Date().getTime()) + EXPIRES
    }
    sessions[session.id] = session
    return session
}

function setSession(req, res) {
    const id = req.cookies[key]

}
