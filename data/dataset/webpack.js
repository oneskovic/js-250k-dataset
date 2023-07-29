"use strict";

var webpack = require("webpack");
var path = require("path");

module.exports = function(release) {
  return {
    entry: "./client/src/app.js",

    output: {
      filename: "app.js",
      path: "./build/js/",
      publicPath: "./build/",

      // Library settings
      library: "reactspa",
      libraryTarget: "umd"
    },

    cache: !release,
    debug: !release,
    devtool: false,

    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({"process.env.NODE_ENV": "production"}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [],

    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
      modulesDirectories: ["node_modules", "bower_components"],
      alias: {
        local: path.join(__dirname, "../client/src/")
      }
    },

    externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      "jquery": "jQuery"
    },
    module: {
      preLoaders: [
       {
          test: /\.jsx?$/,
          exclude: /node_modules|bower_components/,
          loader: "eslint-loader"
        }
      ],

      loaders: [
        {
          test: /\.css$/,
          loader: "style!css"
        },
        {
          test: /\.less$/,
          loader: "style!css!less"
        },
        {
          test: /\.gif/,
          loader: "url-loader?limit=10000&mimetype=image/gif"
        },
        {
          test: /\.jpg/,
          loader: "url-loader?limit=10000&mimetype=image/jpg"
        },
        {
          test: /\.png/,
          loader: "url-loader?limit=10000&mimetype=image/png"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader?experimental"
        },
        {
          test: /\.json/,
          loader: "json-loader"
        }
      ]
    }
  };
};
