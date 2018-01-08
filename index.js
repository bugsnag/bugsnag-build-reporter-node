const makePayload = require('./lib/payload')
const send = require('./lib/send')
const logger = require('./lib/logger')

module.exports = (opts, path) => {
  const log = logger()
  path = path || process.cwd()

  return new Promise((resolve, reject) => {
    const onError = (error) => {
      log.error(`${error.message}`)
      if (error.errors) {
        log.error(error.errors.map(e => `  ${e}`).join(''))
      } else {
        log.error(`Error detail…\n${error.stack}`)
      }
    }

    const onSuccess = () => log.info(`build info sent`)
    makePayload(opts, path, log, (err, data) => {
      if (err) return onError(err)
      log.info('sending', data)
      send(data, onSuccess, onError)
    })
  })
}
