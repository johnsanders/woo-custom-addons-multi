/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable sort-keys */
const path = require('path');
const glob = require('glob');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
	analyzerPort: 8989,
});
const cleanWebpackPlugin = new CleanWebpackPlugin();
const copyPlugin = new CopyPlugin({
	patterns: [{ from: './src/.htaccess', to: './' }],
});
const PurgecssPluginConfig = new PurgecssPlugin({
	paths: glob.sync(path.resolve('./src/**/*'), { nodir: true }),
	keyframes: true,
	safelist: {
		standard: [],
	},
});
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({ filename: '[name].css' });
const devPlugins = [cleanWebpackPlugin, PurgecssPluginConfig, MiniCssExtractPluginConfig];
const productionPlugins = [
	cleanWebpackPlugin,
	copyPlugin,
	bundleAnalyzerPlugin,
	PurgecssPluginConfig,
	MiniCssExtractPluginConfig,
];

module.exports = {
	mode: process.env.NODE_ENV,
	entry: path.resolve('./src/index.tsx'),
	output: {
		filename: 'index.js',
		path: path.resolve('./dist'),
		publicPath: process.env.NODE_ENV === 'production' ? '/home/' : '/',
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json'],
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'babel-loader', include: path.resolve('./src') },
			{ test: /\.css$/, loader: MiniCssExtractPlugin.loader },
			{ test: /\.css$/, loader: 'css-loader' },
			{
				test: /\.(png|jpg|jpeg|mp4|fbx|woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
			},
		],
	},
	plugins: process.env.NODE_ENV === 'production' ? productionPlugins : devPlugins,
	devtool: 'source-map',
	devServer: { historyApiFallback: true },
	stats: {
		colors: true,
		reasons: true,
		chunks: true,
	},
};
