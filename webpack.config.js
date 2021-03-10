const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/js/index.ts",

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename:"main.[contenthash].css" }),
    new HtmlWebpackPlugin({ template: "src/assets/index.html" })
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        include: [path.resolve(__dirname, "src/js")],
        exclude: [/node_modules/]
      },

      {
        test: /.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },

          {
            loader: "css-loader",
            options: { sourceMap: true }
          },

          {
            loader: "less-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  devServer: {
    open: true,
    host: "localhost"
  }
}
