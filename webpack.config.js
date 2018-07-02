var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: {
   main: './src/index.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '/public'),
    filename: "bundle.js",
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3000
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    })
  ],
  module: {
    rules: [
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
            presets: ["react", "env"]
        }
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: "json-loader"
      },
      {
        test: /\.scss$|\.css$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
}
