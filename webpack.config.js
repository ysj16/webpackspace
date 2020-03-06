let path = require('path')
let glob = require('glob');
let HtmlWebpackPlugin = require('html-webpack-plugin') 
let entries = {}
let HtmlPlugins = []
let files = glob.sync('./case/*.js')
files.map(path => {
  let reg = /\/([\w-]+)\.js$/
  let match = reg.exec(path)
  let filename = match[1]
  entries[filename] = path

  let _plugin = new HtmlWebpackPlugin({
    filename: `${filename}/index.html`,
    chunks: [filename]
  })
  HtmlPlugins.push(_plugin)
})

module.exports = {
  watch: true,
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve('./dist'),
    filename: '[name]/[name].js'
  },
  plugins: [
    ...HtmlPlugins
  ]
}