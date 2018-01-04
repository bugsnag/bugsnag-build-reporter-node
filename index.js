const parse = require('./build').parse
// const deliver = require('./deliver')

module.exports = opts => {
  const log = require('./logger')()

  return () => {
    return new Promise((resolve, reject) => {
      const onError = (error) => {
        log.error(`${error.message}`)
        if (error.errors) {
          log.error(error.errors.map(e => `  ${e}`).join(''))
        } else {
          log.error(`Error detail…\n${error.stack}`)
        }
      }

      const onSuccess = () => {
        log.info(`build info sent`)
      }

      parse(opts, log, (err, data) => {
        if (err) return onError(err)
        log.info('sending', data)
        console.log(data, onSuccess, onError)
        // deliver(data, onSuccess, onError)
      })
    })
  }
}
