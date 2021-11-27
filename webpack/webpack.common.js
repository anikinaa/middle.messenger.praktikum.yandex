const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const srcPath = path.resolve(__dirname, '..', 'src')
const distPath = path.resolve(__dirname, '..', 'dist')

console.log('+++++++++',path.resolve(srcPath, 'modules/'))
module.exports = {
    entry: path.resolve(srcPath, 'index.ts'),
    output: {
        path: distPath,
        filename: 'app.js',
        publicPath: '/',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.ts', '...'],
        alias: {
            '@api': path.resolve(srcPath, 'api/'),
            '@assets': path.resolve(srcPath, 'assets/'),
            '@blocks': path.resolve(srcPath, 'blocks'),
            '@components': path.resolve(srcPath, 'components'),
            '@controllers': path.resolve(srcPath, 'controllers/'),
            '@models': path.resolve(srcPath, 'models/'),
            '@modules': [path.resolve(srcPath, 'modules/'), path.resolve(srcPath, 'modules')],
            '@utils': path.resolve(srcPath, 'utils/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tpl$/,
                use: path.resolve(__dirname, 'tpl-loader.js')
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.svg$/i,
                type: 'asset',
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

       ]
    },
    plugins: [
        new CircularDependencyPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(srcPath, 'index.html'),
            filename: path.resolve(distPath, 'index.html')
        })
    ]
};
