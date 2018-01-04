const autoDetectSourceControl = require('./source-control')

const schema = {
  apiKey: {
    message: 'is required',
    validate: value => typeof value === 'string' && value.length
  },
  appVersion: {
    validate: value => true
  },
  appVersionCode: {
    validate: value => true
  },
  appBundleVersion: {
    validate: value => true
  },
  builderName: {
    validate: value => true
  },
  metadata: {
    validate: value => {
      if (value === undefined) return true
      if (value === null) return true
      if (value && typeof value === 'object') {
        Object.keys(value)
      }
    },
    message: 'may be an object with key/value pairs where the only permitted values are strings'
  },
  sourceControl: {
    validate: value => true
  },
  releaseStage: {
    validate: value => true
  },
  autoAssignRelease: {
    validate: value => true
  }
}

const parse = (opts, log, cb) => {
  const obj = Object.keys(schema).reduce((accum, key) => {
    accum[key] = opts[key] || undefined
    return accum
  }, {})

  if (obj.sourceControl !== undefined) return validate(obj, cb)

  // special implicit defaults
  autoDetectSourceControl(process.cwd(), log, (err, data) => {
    if (err) {
      log.warn('error detecting repository info from source control', err)
      return validate(obj, cb)
    }
    if (data) obj.sourceControl = data
    validate(obj, cb)
  })
}

const validate = (opts, cb) => {
  const errors = Object.keys(schema).reduce((accum, key) => {
    if (schema[key].validate(opts[key])) return accum
    return accum.concat({ key, message: schema[key].message, value: opts[key] })
  }, [])
  if (!errors.length) return cb(null, opts)
  const err = new Error('Configuration error')
  err.errors = errors.map(e => `${e.key}: ${e.message}`)
  cb(err)
}

module.exports.parse = parse
