const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = "development"

process.env.NODE_ENV === 'production' ? mode = "production" : null;

module.exports = {
    // mode defaults to 'production' if not set
    mode,

    output: {
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

    plugins: [new MiniCssExtractPlugin()],

    resolve: {
        extensions: [".js", ".jsx"]
    }
}