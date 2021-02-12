const path = require('path');

const configFactory = require('../config/webpack.config.js')

const config = configFactory('development')

module.exports = {
  webpackFinal: (config) => {
    return { ...config, module: { ...config.module, rules: config.module.rules } };
  },

  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ]
}
