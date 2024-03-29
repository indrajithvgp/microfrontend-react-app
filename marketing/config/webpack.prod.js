const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJSON = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
    mode: 'production',
    output:{
        filename: '[name].[contenthash].js',
        publicPath: '/marketing/latest/'
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies
        }),
        
    ]
}

module.exports = merge(prodConfig, commonConfig)