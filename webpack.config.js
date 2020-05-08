const HtmlWebpackPlugin = require('html-webpack-plugin');
const express = require('express');

module.exports = {
    entry: {
        main: './src/renderer.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        setup: function (app) {
            app.use('/templates', express.static('./src/templates'));
        }
    }
}