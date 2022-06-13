const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = "development"

const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: 'body' // To inject Javascript bundle before Body tag in html template
    }),
]

if (process.env.NODE_ENV === 'production') {
    mode = "production"
} 

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    // mode defaults to 'production' if not set
    mode,

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "images/[hash][ext][query]",
    },

    devServer: {
        static: './dist',
        hot: true,
        open: true,
        historyApiFallback: true,
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10000,
                    },
                },
            },

            {
                test: /\.svg$/,
                use: [
                    {
                        loader: require.resolve('@svgr/webpack'),
                        options: {
                            native: true,
                        },
                    },
                    {
                        loader: require.resolve('file-loader'),
                    },
                ],
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    // Without additional settings, this will reference .babelrc
                    loader: "babel-loader"
                }
            },

            {
                test: /\.(s[ac]|c)ss$/i, // Will support sass,scss,css extensions
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },


        ]
    },

    plugins,

    resolve: {
        extensions: [".js", ".jsx"]
    }
}