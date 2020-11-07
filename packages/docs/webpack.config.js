const webpack = require('webpack')
const baseConfig = require('gnoll/config/webpack')
const babelConfig = require('gnoll/config/babel')
const merge = require('webpack-merge')

const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = merge(baseConfig, {
	output: {
		publicPath: PRODUCTION ? 'https://sunflowerdeath.github.io/shadowform/' : '/'
	},
	plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)],
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: babelConfig
					},
					{
						loader: require.resolve('minimark-loader'),
						options: require('minibook/minimark-preset')
					}
				]
			}
		]
	},
	serve: {
		port: 1337,
		host: '0.0.0.0'
	}
})
