module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://123.57.16.21',
        changeOrigin: true
      }
    }
  }
}