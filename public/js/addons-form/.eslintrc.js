module.exports = {
	env: {
		browser: true,
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['unused-imports'],
	rules: {
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-unused-vars': 'off',
		'no-invalid-this': 'error',
		'prettier/prettier': 'warn',
		'react/destructuring-assignment': 0,
		'react/jsx-sort-props': 'error',
		'sort-imports': 'error',
		'sort-keys': 'error',
		'unused-imports/no-unused-imports-ts': 'error',
		'unused-imports/no-unused-vars-ts': [
			'warn',
			{ args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' },
		],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
