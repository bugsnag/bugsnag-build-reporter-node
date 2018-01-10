const test = require('tape')
const proxyquire = require('proxyquire')
const mockHttps = { request: () => {} }
const send = proxyquire('../send', {
  'https': mockHttps
})
const EventEmitter = require('events')

test('send', t => {
  mockHttps.request = () => {
    t.end()
    return Object.assign(new EventEmitter(), { write: () => {}, end: () => {} })
  }
  send('https://builds.bugsnag.com', {}, () => {}, () => {})
})
