const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    module: {
        rules: [
            {
                test: /\.tpl$/,
                use: path.resolve(__dirname, 'tpl-loader.js')
            },
            // {
            //     test: /\.svg$/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 generator: (content) => svgToMiniDataURI(content.toString()),
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // },
            // {
            //     test: /\.svg$/,
            //     use: ['file-loader']
            // },
            // {
            //     test: /.(jpg|jpeg|png|svg)$/,
            //     use: ['file-loader'],
            // },
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
                type: 'asset/resource',
            },
            // {
            //     test: /\.svg$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 esModule: true,
            //             },
            //         },
            //     ],
            //     // type: 'asset/resource',
            //     // generator: {
            //     //     filename: () => 'img/[name][ext]'
            //     // }
            // },
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
