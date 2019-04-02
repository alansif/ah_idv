module.exports = {
    devServer: {
      // open: process.platform === 'darwin',
      // host: 'localhost',
      port: 8166,
      open: true, //配置自动启动浏览器 
      proxy: {
        '/api': {
            target: 'http://111.198.146.40:8165'
        } 
      }
     }, 
  }