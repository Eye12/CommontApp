/*
 * @Author: lle_wang
 * @Date:   2018-05-02 19:04:02
 * @Last Modified by:   lle_wang
 * @Last Modified time: 2018-05-17 09:52:05
 */
const webpack = require('webpack');
const path = require('path');
module.exports = {
	devServer: {
		port: 8000,
		hot: true,
		hotOnly: true,
		overlay: true,
		historyApiFallback: {
			from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
			to: function(context) {
				return '/' + context.match[1] + context.match[2] + '.html';
			}
		},
		proxy: {
			'/register': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false
			},
			'/login': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false
			},
			'/citys': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false
			},
			'/carousel': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false
			},
			'/commodity': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false
			}
		}
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}