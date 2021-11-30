const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
// const webpack = require("webpack");

module.exports = (_, argv) => ({
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    publicPath:
      argv.mode === "production"
        ? "https://module-federation-host-silk.vercel.app/"
        : "http://localhost:3001/",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //     "process.env.SC_CLASS_PREFIX": JSON.stringify("XX-"),
    // }),
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@[app2Url]/remoteEntry.js",
      },
      shared: {
        react: "^17.0.2",
        "react-dom": "^17.0.2",
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
