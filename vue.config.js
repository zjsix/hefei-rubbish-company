const path = require("path");
const webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, dir)
}
const router = 'http://122.114.222.162/api'

module.exports = {
    publicPath: "./",    //基本路径
    outputDir: 'dist',  //打包时生成的文件夹
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: process.env.NODE_ENV === 'development',
    devServer: {
        port: 80,
        open: true,
        proxy: {
            '/api': {
                target: router,
                changeOrigin: true,
                pathRewrite:
                    { '^/api': '' }
            }
        }
    },
    configureWebpack: {
        name: process.env.VUE_APP_NAME,
        resolve: {
            alias: {
                '@': resolve('src'),
            }
        },
        externals: {},
        plugins: [],
    },
}