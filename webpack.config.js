/*
 * @Author: lle_wang
 * @Date:   2018-05-02 18:07:53
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-12 15:45:26
 */
const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
// 引入其他配置文件
const commonConfig = require('./cfg/common.js');
const proConfig = require('./cfg/pro.js');
const devConfig = require('./cfg/dev.js');
let envConfig = env => {
	let cssLoader = env === 'product' ? ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [{
			loader: 'css-loader',
			options: {
				minimize: true,
				importLoaders: 1
			}
		}, {
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					require('postcss-sprites')({
						spritePath: 'dist/images',
						retina: true
					})
				]
			}
		}]
	}) : [{
		loader: 'style-loader',
		options: {
			sourceMap: true
		}
	}, {
		loader: 'css-loader',
		options: {
			sourceMap: true,
		}
	}]
	let styleLoader = env === 'product' ? ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [{
			loader: 'css-loader',
			options: {
				minimize: true,
				importLoaders: 2
			}
		}, {
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					require('postcss-sprites')({
						spritePath: 'dist/images',
						retina: true
					})
				]
			}
		}, {
			loader: 'sass-loader'
		}]
	}) : [{
		loader: 'style-loader',
		options: {
			sourceMap: true
		}
	}, {
		loader: 'css-loader',
		options: {
			sourceMap: true,
			importLoaders: 1
		}
	}, {
		loader: 'sass-loader'
	}]

	let imgLoader = env === 'product' ? [{
		loader: 'url-loader',
		options: {
			limit: 100,
			name: '[name].[hash:5].[ext]',
			outputPath: 'images',
			publicPath: 'images'
		}
	}, {
		loader: 'img-loader',
		options: {
			pngquant: {
				quality: 50
			}
		}
	}] : {
		loader: 'file-loader',
		options: {
			name: '[name].[hash:5].[ext]',
			outputPath: 'images',
			publicPath: 'images'
		}
	}

	let cleanFiles = env === 'product' ? ['dist'] : [];

	let minifyObj = {
		caseSensitive: false, // 是否大小写敏感
		removeComments: true, // 去除注释
		removeEmptyAtrributes: true, // 去除空属性
		collapseWhitespace: true //是否去除空格
	};
	return {
		module: {
			rules: [{
				test: /\.css$/,
				use: cssLoader
			}, {
				test: /\.scss$/,
				use: styleLoader
			}, {
				test: /\.(svg|jpe?g|gif|png)$/,
				use: imgLoader
			}]
		},
		plugins: [
			new htmlWebpackPlugin({
				template: './src/index.html',
				filename: 'index.html',
				favicon: './src/images/favicon.ico',
				minify: minifyObj
			}),
			new ExtractTextPlugin({
				filename: '[name].[hash:5].css'
			}),
			new cleanPlugin(cleanFiles)
		]
	}
}

module.exports = env => {
	let currentConfig = env === 'product' ? proConfig : devConfig;
	return merge(commonConfig, currentConfig, envConfig(env));
}