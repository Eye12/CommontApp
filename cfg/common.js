/*
 * @Author: lle_wang
 * @Date:   2018-05-02 19:03:56
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-18 10:14:21
 */
const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		index: path.resolve(__dirname, '../src/index.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash:5].js',
		chunkFilename: 'js/[name].[chunkhash:5].js',
		publicPath: ''
	},
	resolve: {
		extensions: ['*', '.jsx', '.js', '.scss'],
		alias: {
			components: path.resolve(__dirname, '../src/components/'),
			compass: path.resolve(__dirname, '../node_modules/compass-mixins/lib/compass/'),
			containers: path.resolve(__dirname, '../src/containers/'),
			reducers: path.resolve(__dirname, '../src/reducers/'),
			actions: path.resolve(__dirname, '../src/actions/'),
			util: path.resolve(__dirname, '../src/util/')
		}
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react', "es2015", "stage-0"]
				}
			}, {
				loader: 'eslint-loader',
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			}]
		}, {
			test: /\.(woff2?|svg|eot|ttf)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[hash:5].[ext]',
					outputPath: 'fonts',
					publicPath: 'fonts'
				}
			}]
		}]
	},
	plugins: [
		new webpack.NamedChunksPlugin(),
		new webpack.NamedModulesPlugin(),
	]
}