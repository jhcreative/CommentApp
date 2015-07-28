ngAnnotate = require 'ng-annotate'

module.exports = class NgAnnotateCompiler
  brunchPlugin: yes
  type: 'javascript'
  extenstion: 'js'

  constructor: (config) ->
    @pattern = config?.plugins?.ng_annotate?.pattern

  optimize: (params, callback) ->
    {data, path} = params

    result = ngAnnotate data, add: true
    callback result.errors, result.src


