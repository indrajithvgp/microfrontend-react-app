const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')


const devConfig = { 
    mode: 'development',
    devServer:{
        port: 8082,
        historyApiFallback:{
            index: 'index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: "remoteEntry.js",
            exposes:{
                './Dashboard': "./src/bootstrap"
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig)