const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    home: "./src/home/home.js",
    projects: "./src/projects/projects.js",
    contact: "./src/contact/contact.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components|server)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
          },
        },
      },
      {},
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ["file-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/images/", to: "images/" },
        { from: "./src/manifest.json", to: "manifest.json" }
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["home"],
      filename: "./index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/projects/index.html",
      chunks: ["projects"],
      filename: "./projects/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/contact/index.html",
      chunks: ["contact"],
      filename: "./contact/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new WorkboxWebpackPlugin.GenerateSW({
        swDest: 'sw.js',
        clientsClaim: true,
        skipWaiting: true
    })
  ],
};
