'use strict'

const https = require('https')
const http = require('http')
const concat = require('concat-stream')
const url = require('url')
const MAX_ATTEMPTS = 5
const RETRY_INTERVAL = process.env.BUGSNAG_RETRY_INTERVAL || 1000

module.exports = (endpoint, data, onSuccess, onError) => {
  let attempts = 0
  const maybeRetry = (err) => {
    attempts++
    if (err && err.isRetryable && attempts < MAX_ATTEMPTS) return setTimeout(go, RETRY_INTERVAL)
    return onError(err)
  }
  const go = () => send(endpoint, data, onSuccess, maybeRetry)
  go()
}

const send = (endpoint, data, onSuccess, onError) => {
  const parsedUrl = url.parse(endpoint)
  const payload = JSON.stringify(data)
  const req = (parsedUrl.protocol === 'https:' ? https : http).request({
    method: 'POST',
    hostname: parsedUrl.hostname,
    path: parsedUrl.path || '/',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    },
    port: parsedUrl.port || undefined
  }, res => {
    res.pipe(concat(body => {
      if (res.statusCode === 200) return onSuccess()
      if (res.statusCode !== 400) {
        const err = new Error(`HTTP status ${res.statusCode} received from builds API`)
        err.isRetryable = true
        return onError(err)
      }
      try {
        const err = new Error('Invalid payload sent to builds API')
        err.errors = JSON.parse(body).errors
        return onError(err)
      } catch (e) {
        return onError(new Error(`HTTP status ${res.statusCode} received from builds API`))
      }
    }))
  })
  req.on('error', onError)
  req.write(payload)
  req.end()
}
