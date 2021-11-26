const path = require('path');
const nodeExternals = require('webpack-node-externals')

const srcPath = path.resolve(__dirname, '..', 'src')
const distPath = path.resolve(__dirname, '..', 'dist')

module.exports = {
    mode: 'development',
    // entry: path.resolve(srcPath, 'index.ts'),
    devtool: 'inline-cheap-module-source-map',
    externals: [nodeExternals()],
    output: {
        // path: distPath,
        // filename: 'app.js',
        // publicPath: '/',
        // assetModuleFilename: 'images/[hash][ext][query]',
        // devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        // devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
        extensions: ['.ts', '...'],
        alias: {
            xyz$: false
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
                use: 'null-loader'
            },

        ]
    },
};
