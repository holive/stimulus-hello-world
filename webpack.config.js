const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		bundle: "./src/index.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html'
		}),
		new CopyPlugin({
			patterns: [
				{ from: "public/*.css", to: "." },
			],
		}),
	],
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	
	mode: "production",
	devtool: "source-map",
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/
				],
				use: [
					{ loader: "babel-loader" }
				]
			},
		]
	}
}
