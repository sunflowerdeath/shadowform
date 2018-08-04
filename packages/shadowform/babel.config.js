const baseConfig = require('gnoll/config/babel')

module.exports = {
	...baseConfig,
	plugins: [
		'@babel/plugin-transform-runtime'
	]
}
