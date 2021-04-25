const webpack = require('webpack')
const { join, resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': resolve(__dirname, 'src/'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@configs': resolve(__dirname, 'src/configs'),
      '@resolvers': resolve(__dirname, 'src/resolvers'),
      '@services': resolve(__dirname, 'src/services'),
      '@typeDefs': resolve(__dirname, 'src/typeDefs'),
      '@types': resolve(__dirname, 'src/types'),
      '@interceptors': resolve(__dirname, 'src/interceptors'),
      '@modules': resolve(__dirname, 'src/modules'),
      '@graphql': resolve(__dirname, 'src/modules/graphql.module'),
      '@entities': resolve(__dirname, 'src/entities'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: join(__dirname, '.hot'),
    filename: 'server.js'
  }
}
