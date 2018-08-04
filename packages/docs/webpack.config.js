const baseConfig = require('gnoll/config/webpack')
const babelConfig = require('gnoll/config/babel')
const sass = require('gnoll-sass')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, sass({ cssModules: false }), {
	entry: './src/index.js',
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
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
	devServer: {
		port: 1337,
		historyApiFallback: true,
		host: '0.0.0.0'
	}
})
