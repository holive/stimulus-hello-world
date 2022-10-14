const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const isProd = process.env.NODE_ENV === "production"

module.exports = {
	devServer: {
		compress: true,
		port: 9000,
		static: { directory: path.join(__dirname, 'public') },
	},
	entry: { bundle: "./src/index.js" },
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: isProd
	},
	mode: isProd ? "production" : "development",
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /\.lazy\.css$/i,
				use: [ MiniCssExtractPlugin.loader, "css-loader" ],
			},
			{
				test: /\.lazy\.css$/i,
				use: [
					{ loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
					'css-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{ loader: "babel-loader" }],
			},
			{
				test: /\.ejs$/i, use: ['html-loader', 'template-ejs-loader'],
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/ejs/index.ejs',
			minify: isProd,
			showErrors: !isProd,
			favicon: "public/images/favicon.ico",
			cache: false,
		}),
		new HTMLInlineCSSWebpackPlugin(),
	],
	optimization: {
		minimize: isProd,
		minimizer: [ `...`, new CssMinimizerPlugin() ],
		realContentHash: false,
	},
}
