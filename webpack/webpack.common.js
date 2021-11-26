const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri')

const srcPath = path.resolve(__dirname, '..', 'src')
const distPath = path.resolve(__dirname, '..', 'dist')

module.exports = {
    entry: path.resolve(srcPath, 'index.ts'),
    output: {
        path: distPath,
        // publicPath: distPath,
        filename: 'script.bundle.js',
        clean: true,
        // publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '...']
    },
    experiments: {
        asset: true
    },
    module: {
        rules: [
            {
                test: /\.tpl$/,
                use: path.resolve(__dirname, 'tpl-loader.js')
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.svg$/i,
                type: 'asset',
                use: 'svgo-loader'
            },

       ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // hash: true,
            template: path.resolve(srcPath, 'index.html'),
            filename: path.resolve(distPath, 'index.html')
        })
    ]
};
