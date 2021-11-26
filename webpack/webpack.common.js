const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, '..',  'src')
const distPath = path.resolve(__dirname, '..',  'dist')

module.exports = {
    entry: path.resolve(srcPath,  'index.ts'),
    output: {
        path: distPath,
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
                test: /\.tpl?$/,
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
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test:/\.(svg|png|jpg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: () => 'img/[name][ext]'
                }
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template:  path.resolve(srcPath, 'index.html'),
            filename: path.resolve(distPath, 'index.html')
        })
    ]
};
