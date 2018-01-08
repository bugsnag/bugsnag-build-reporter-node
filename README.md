# bugsnag-build-reporter

A tool for reporting your application's builds to Bugsnag.

## Usage

This module can be used as a CLI or via task runners such as Gulp/Grunt.

### CLI

Install globally with `npm i -g bugsnag-build-reporter` or locally as a dev dependency `npm i -D bugsnag-build-reporter`. If installed via the latter, recent versions of npm come with a tool called [`npx`](https://github.com/zkat/npx) which will help run it without typing burdensome paths.

```
A tool for reporting your application's builds to Bugsnag

Usage
  $ bugsnag-build-reporter <flags> <metadata>

Options
  --api-key, -k  Set your notifier API key [required]
  --app-version, -v  Set the app version [required]
  --release-stage, -s Set the release stage

  --source-control-provider, -p  Set the repo provider
  --source-control-repository, -r  Set the repo URL
  --source-control-revision, -e  Set the source control revision id (e.g commit SHA)

  --app-version-code, -c  Set the version code (Android only)
  --app-bundle-version, -b  Set the bundle version (iOS/macOS/tvOS only)
  --builder-name, -n  Set the name of the entity that triggered the build

  metadata
    Arbitrary "key=value" pairs will be passed to the build API as metadata
      e.g. foo=bar

Examples

  bugsnag-build-reporter \
    --api-key cc814aead128d38d0767094327b4784a \
    --app-version 1.3.5

  bugsnag-build-reporter \
    -k cc814aead128d38d0767094327b4784a \
    -v 1.3.5
```

### npm scripts

```js
scripts: {
  'bugsnag-report-build': 'bugsnag-build -k YOUR_API_KEY -v APP_VERSION'
}
```

### gulp

Install as a dev dependency `npm i -D bugsnag-build-reporter`.

_gulpfile.js_
```js
const bugsnagBuild = require('bugsnag-build-reporter')
const gulp = require('gulp')

gulp.task('reportBuildToBugsnag', () => {
  return bugsnagBuild({
    apiKey: 'YOUR_API_KEY',
    appVersion: '1.2.3'
    /* other options... */
  })
})
```

### grunt

Install as a dev dependency `npm i -D bugsnag-build-reporter`.

_Gruntfile.js_
```js
module.exports = function (grunt) {
  grunt.initConfig({
    bugsnagBuilds: {
      apiKey: 'YOUR_API_KEY',
      appVersion: '1.2.3'
      /* other options... */
    }
  })

  grunt.loadNpmTasks('bugsnag-build')
}
```

### Webpack

Install as a dev dependency `npm i -D bugsnag-build-reporter`.

_webpack.config.js_
```js
const BugsnagBuildPlugin = require('bugsnag-build-reporter/webpack/build')

module.exports = {
  plugins: [
    new BugsnagBuildPlugin({
      apiKey: 'YOUR_API_KEY',
      appVersion: '1.2.3'
      /* other options... */
    })
  ]
}
```

### JS API

```js
const bugsnagBuild = require('bugsnag-build-reporter')
bugsnagBuild({
  apiKey: 'YOUR_API_KEY',
  appVersion: '1.2.3',
  /* other options... */
}/* , optional path, defaults to process.cwd() */)
```
