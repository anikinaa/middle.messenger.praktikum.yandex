const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const distPath = path.resolve(__dirname, '..',  'dist')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: {
            // directory: distPath,
        },
        historyApiFallback: true,
        hot: true,
        compress: true,
        port: 3000,
    },
});
