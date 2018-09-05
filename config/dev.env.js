'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ALGOLIA_KEY: '"13dc387d499b4b224443d0f2bfd6de91"',
  ALGOLIA_INDEX: '"Restaurants"',
  ALGOLIA_APPLICATION_ID: '"GXA0HF52CT"',
})
