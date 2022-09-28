const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 9000,
	},
	
	entry: {
		bundle: "./src/index.js"
	},
	output: {
		filename: "[name].js", path: path.resolve(__dirname, "dist"), clean: true,
	},
	
	mode: "production",
	devtool: "source-map",
	
	module: {
		rules: [
			{
				test: /\.css$/i, use: [
					{
						loader: 'style-loader',
						options: {
							insert: 'head',
							injectType: 'singletonStyleTag'
						},
					},
					"css-loader"
				],
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{ loader: "babel-loader" }]
			},
			{
				test: /\.ejs$/i, use: ['html-loader', 'template-ejs-loader'],
			}
		]
	},
	
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html', template: './src/ejs/index.ejs',
		})
	],
}
