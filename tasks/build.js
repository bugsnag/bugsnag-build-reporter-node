const reportBuild = require('../')
module.exports = grunt => {
  grunt.registerTask('reportBuildToBugsnag', 'notify Bugsnag of a build', function () {
    const done = this.async()
    const options = Object.assign({}, this.options)
    reportBuild(options)
      .then(() => done())
      .catch(() => done(false))
  })
}
