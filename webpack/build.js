const reportBuild = require('../')

class BugsnagBuildReporterPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      reportBuild(this.options, compilation.compiler.options.context)
        .then(callback)
        .catch(callback)
    })
  }
}

module.exports = BugsnagBuildReporterPlugin
