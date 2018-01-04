#!/usr/bin/env node

const meow = require('meow')

const argv = meow(`
  Usage
    $ bugsnag-builds <flags> <metadata>

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

    bugsnag-builds \\
      --api-key cc814aead128d38d0767094327b4784a \\
      --app-version 1.3.5

    bugsnag-builds \\
      -k cc814aead128d38d0767094327b4784a \\
      -v 1.3.5
`, {
  flags: {
    apiKey: {
      type: 'string',
      alias: 'k'
    },
    appVersion: {
      type: 'string',
      alias: 'a'
    },
    releaseStage: {
      type: 'string',
      alias: 's'
    },
    sourceControlProvider: {
      type: 'string',
      alias: 'p'
    },
    sourceControlRepository: {
      type: 'string',
      alias: 'r'
    },
    sourceControlRevision: {
      type: 'string',
      alias: 'e'
    },
    appVersionCode: {
      type: 'string',
      alias: 'c'
    },
    appBundleVersion: {
      type: 'string',
      alias: 'b'
    },
    builderName: {
      type: 'string',
      alias: 'n'
    }
  }
})

if (argv.flags.sourceControlProvider && argv.flags.sourceControlRepository && argv.flags.sourceControlRevision) {
  argv.flags.sourceControl = {
    provider: argv.flags.sourceControlProvider,
    repository: argv.flags.sourceControlRepository,
    revision: argv.flags.sourceControlRevision
  }
}

console.log(argv.input)
require('../index')(argv.flags)({})
