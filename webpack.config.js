const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const port = process.env.PORT || '9000';

let mode = 'development';

const plugins = [
    /**
     * Instead of CleanWebpackPlugin we are using "clean: true"
     * in output settings to empty output directory before build
     */
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name][contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body', // To inject Javascript bundle before Body tag in html template
    }),
];

if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

if (process.env.SERVE) {
    // We only want React Refresh Reloading in Serve mode during development
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    // mode defaults to 'production' if not set
    mode,

    // This is unnecessary in Webpack 5, because it's the default entry point.
    // However, react-refresh-webpack-plugin can't find the entry without it.
    entry: './src/index.js',

    output: {
        // output path is required for `clean-webpack-plugin`
        path: path.resolve(__dirname, 'dist'),
        // To prevent caching, we need to add ContentHash to filenames
        filename: '[name][contenthash:8].js',
        // this places all images processed in an image folder
        assetModuleFilename: 'images/[hash][ext][query]',
        // For Empty output directory before generating build, alternate of `clean-webpack-plugin'
        clean: true,
    },

    // required if using webpack-dev-server
    devServer: {
        static: './dist',
        hot: true,
        open: true,
        historyApiFallback: true,
        port,
    },

    devtool: 'source-map',

    optimization: {
        minimize: process.env.NODE_ENV === 'production',
    },

    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i, // Will support sass,scss,css extensions
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // This is required for asset imports in CSS, such as url()
                        options: { publicPath: '' },
                    },
                    'css-loader',
                    'postcss-loader',
                    // according to the docs, sass-loader should be at the bottom, which
                    // loads it first to avoid prefixes in your sourcemaps and other issues.
                    'sass-loader',
                ],
            },

            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                /**
                 * The `type` setting replaces the need for "url-loader"
                 * and "file-loader" in Webpack 5.
                 *
                 * setting `type` to "asset" will automatically pick between
                 * outputing images to a file, or inlining them in the bundle as base64
                 * with a default max inline size of 8kb
                 */
                type: 'asset/resource',
                /**
                 * If you want to inline larger images, you can set
                 * a custom `maxSize` for inline like so:
                 */
                parser: {
                    dataUrlCondition: {
                        maxSize: 10000,
                    },
                },
            },

            {
                test: /\.svg$/i,
                /**
                 * We will handle svgs seperately as we need both options to import
                 * SVGs as components and use them as well as to use the inline SVGS
                 * for which we can use "@svgr/webpack" or "react-svg-loader" plugin
                 */
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    // Without additional settings, this will reference .babelrc
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins,

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
};
