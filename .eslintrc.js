module.exports = {
	extends: ['gnoll'],
	rules: {
		// don't restrict for of
		'no-restricted-syntax': [
			'error',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement'
		],
		'lines-between-class-members': 0,
		// this fails when using do expressions
		'no-unused-expressions': 0,

		'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],

		'react/require-default-props': 0,
		'react/forbid-prop-types': 0,
		'react/destructuring-assignment': 0
	},
	overrides: [
		{
			files: ['packages/*/src/**/__tests__/*.js'],
			env: {
				mocha: true,
				browser: true
			}
		}
	]
}
