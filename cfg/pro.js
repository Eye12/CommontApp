/*
 * @Author: lle_wang
 * @Date:   2018-05-02 19:04:07
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-11 20:12:02
 */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
module.exports = {
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new UglifyJsPlugin(),
		new PurifyCSSPlugin({
			paths: glob.sync(path.join(__dirname, '../src/*.html'))
		}),
	]
}