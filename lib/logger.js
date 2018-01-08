const pfx = `[bugsnag-builds]`
const chalk = require('chalk')

module.exports = () => ({
  debug: function () {
    console.log.bind(console, chalk.gray(pfx)).apply(console, arguments)
  },
  info: function () {
    console.log.bind(console, chalk.blue(pfx)).apply(console, arguments)
  },
  warn: function () {
    console.log.bind(console, chalk.yellow(pfx)).apply(console, arguments)
  },
  error: function () {
    console.log.bind(console, chalk.red(pfx)).apply(console, arguments)
  }
})
