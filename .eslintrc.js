module.exports = {
	extends: ['gnoll'],
	rules: {
		'jsx-a11y/href-no-hash': 2
	},
	overrides: [
		{
			files: ['src/**/__tests__/*.js'],
			env: {
				mocha: true,
				browser: true
			}
		}
	]
}
