const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = "development"

process.env.NODE_ENV === 'production' ? mode = "production" : null;

module.exports = {

    // mode defaults to 'production' if not set
    mode,
    
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    },

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    // Without additional settings, this will reference .babelrc
                    loader: "babel-loader"
                }
            },

            {
                test: /\.(s[ac]|c)ss$/i, // Will support sass,scss,css extensions
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },

    plugins: [new MiniCssExtractPlugin()],
}