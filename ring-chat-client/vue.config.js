const Host = 'http://localhost:4000';
// const webpack = require("webpack");

module.exports = {
    chainWebpack: (config) => {
        console.log(config);
    },
    publicPath: '/',
    devServer: {
        port: 1997,
        proxy: {
            '/api': {
                disableHostCheck: false,
                target: 'http://localhost:4000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api',
                },
            },
            'socket.io': {
                target: Host,
                ws: true,
                changeOrigin: true,
            },
        },
    },
    productionSourceMap: false,
};
