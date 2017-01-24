var webpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./webpack.config.js");

var server = new webpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    publicPath: "http://localhost:3000/dist/"
});

console.log("webpack-dev-server listening at localhost:3000");
server.listen(3000);