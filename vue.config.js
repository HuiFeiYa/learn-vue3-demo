const path = require('path')
const resolve = file => path.resolve(__dirname, file)
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('COMPONENTS',resolve('src/components'))
      .set('STORE',resolve('src/store'))
      .set('ROUTER',resolve('src/router'))
      .set('ASSETS',resolve('src/assetes'))
      .set('VIEWS',resolve('src/views'))
        // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  }
}
