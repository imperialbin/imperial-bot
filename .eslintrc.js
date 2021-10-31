module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['plugin:react/recommended', 'xo', 'xo-typescript', 'xo-react'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/function-component-definition': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'react/jsx-tag-spacing': 'off',
		'@typescript-eslint/triple-slash-reference': 'off',
		'quote-props': 'off',
	},
};