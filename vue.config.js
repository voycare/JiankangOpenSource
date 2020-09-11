module.exports = {
  devServer: {
    port: process.env.PORT,
    disableHostCheck: true,   // That solved it
  },
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  }
}
