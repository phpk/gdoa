const path = require('path');
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    publicPath: isDev ? '' : '../../admin/mind',
    outputDir: '../../admin/mind',
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/')
            }
        }
    }
}