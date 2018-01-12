'use strict'

const test = require('tape')
const http = require('http')
const send = require('../send')

test('send(): successful', t => {
  t.plan(1)
  const server = http.createServer((req, res) => {
    let body = ''
    req.on('data', (d) => { body += d })
    req.on('end', () => {
      res.end('ok')
      let j
      try {
        j = JSON.parse(body)
      } catch (e) {
        t.fail('failed to parse body as json')
      }
      t.ok(j, 'json body was received')
    })
  })
  server.listen()
  send(`http://localhost:${server.address().port}`, {}, () => {
    server.close()
    t.end()
  }, (err) => {
    server.close()
    t.end(err)
  })
})

test('send(): unsuccessful (500)', t => {
  t.plan(2)
  const server = http.createServer((req, res) => {
    res.statusCode = 500
    res.end('error')
  })
  server.listen()
  send(`http://localhost:${server.address().port}`, {}, () => {
    server.close()
    t.fail('send should not succeed')
  }, (err) => {
    server.close()
    t.ok(err)
    t.equal(err.message, 'HTTP status 500 received from builds API')
    t.end()
  })
})

test('send(): unsuccessful (400)', t => {
  t.plan(3)
  const server = http.createServer((req, res) => {
    res.statusCode = 400
    res.setHeader('content-type', 'application/json')
    res.end('{ "errors": [ "flipflop is not a valid crankworble" ] }')
  })
  server.listen()
  send(`http://localhost:${server.address().port}`, {}, () => {
    server.close()
    t.fail('send should not succeed')
  }, (err) => {
    server.close()
    t.ok(err)
    t.equal(err.message, 'Invalid payload sent to builds API')
    t.deepEqual(err.errors, [ 'flipflop is not a valid crankworble' ])
    t.end()
  })
})

test('send(): unsuccessful (400, bad json)', t => {
  t.plan(2)
  const server = http.createServer((req, res) => {
    res.statusCode = 400
    res.setHeader('content-type', 'application/json')
    res.end('{ "err')
  })
  server.listen()
  send(`http://localhost:${server.address().port}`, {}, () => {
    server.close()
    t.fail('send should not succeed')
  }, (err) => {
    server.close()
    t.ok(err)
    t.equal(err.message, 'HTTP status 400 received from builds API')
    t.end()
  })
})
