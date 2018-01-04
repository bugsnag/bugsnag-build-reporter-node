const https = require('https')
const concat = require('concat-stream')

module.exports = (data, onSuccess, onError) => {
  data = JSON.stringify(data)
  const req = https.request({
    method: 'POST',
    hostname: 'build.bugsnag.com',
    path: '/',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
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
  req.write(data)
  req.end()
}
