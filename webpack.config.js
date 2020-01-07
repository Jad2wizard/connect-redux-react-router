/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')

// prettier-ignore
module.exports = (env, argv) => {
	const isDev = argv.mode === 'development'
	const config = {
		entry:  ['./src/index.tsx'],
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
			plugins: [
				new TsConfigPathsPlugin('./tsconfig.json')
			]
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'
					}
				}
			]
		}
	}

	config.mode = 'production'
	config.devtool = 'source-map'
	return config
}
