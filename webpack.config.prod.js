import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

export default {
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: {
    main: "./src/index"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].bundle.css",
      chunkFilename: "[name].[contenthash].chunk.css"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  output: {
    filename: chunkData => {
      return chunkData.chunk.name === "styles"
        ? "[name].[contenthash].bundle.css"
        : "[name].[contenthash].bundle.js";
    },
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[contenthash].chunk.js",
    publicPath: "/"
  },

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  }
};
