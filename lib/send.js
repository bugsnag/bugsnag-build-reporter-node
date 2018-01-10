const https = require('https')
const http = require('http')
const concat = require('concat-stream')
const url = require('url')

module.exports = (endpoint, data, onSuccess, onError) => {
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
        return onError(new Error(`HTTP status ${res.statusCode} received from builds API`))
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
