const baseConfig = require('gnoll/config/webpack')
const sass = require('gnoll-sass')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, sass({ cssModules: false }))
