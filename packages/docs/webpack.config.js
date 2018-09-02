const webpack = require('webpack')
const baseConfig = require('gnoll/config/webpack')
const babelConfig = require('gnoll/config/babel')
const stylesConfig = require('gnoll-styles')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = merge(baseConfig, stylesConfig, {
	output: {
		publicPath: PRODUCTION ? 'https://sunflowerdeath.github.io/shadowform/' : '/'
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
	],
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					{ loader: 'babel-loader', options: babelConfig },
					{
						loader: 'minimark-loader',
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
