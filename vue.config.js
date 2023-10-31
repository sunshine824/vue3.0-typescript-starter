const { defineConfig } = require('@vue/cli-service')
const APP_NAME = require('./package.json').name
const VERSION = require('./package.json').version
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const ElementPlus = require('unplugin-element-plus/webpack')

// 获取发布版本号
process.env.VUE_APP_VERSION = VERSION

// 获取当前时间戳
const timeStamp = new Date().getTime()

module.exports = defineConfig({
  publicPath: '/subapp/micro-client',
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus()
    ],
    output: {
      library: APP_NAME,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${APP_NAME}`,
      // 输出重构 打包编译后的js文件名称，添加时间戳
      filename: `js/[name].[chunkhash].${timeStamp}.js`,
      chunkFilename: `js/[name].[chunkhash].${timeStamp}.js`
    }
  },
  devServer: {
    // development server port 8000
    port: 8120,
    // 关闭主机检查，使微应用可以被 fetch
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    client: {
      overlay: false
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.minimizer('terser').tap((args) => {
        let { terserOptions } = args[0]
        terserOptions.compress.drop_console = true
        terserOptions.compress.drop_debugger = true
        return args
      })
    }
  }
})
