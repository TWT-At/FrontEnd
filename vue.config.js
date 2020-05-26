module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://at.kuangjux.top',
        changeOrigin: true
      }
    }
  }
}