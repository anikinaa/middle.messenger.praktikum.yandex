const common = require('./webpack.common.js');
const path = require('path');
const nodeExternals = require('webpack-node-externals')

const alias = common.resolve.alias

module.exports = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '...'],
        alias: {
            ...alias,
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
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|scss)$/i,
                type: 'null-loader',
            },

        ]
    },
};
