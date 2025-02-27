// Note this only includes basic configuration for development mode.
// For a more comprehensive configuration check:
// https://github.com/fable-compiler/webpack-config-template
const CopyPlugin = require('copy-webpack-plugin');

var path = require("path");

var production = process.argv.indexOf("-p") >= 0;

module.exports = {
    mode: production ? "production" : "development",
    entry: {
        bundle: path.join(__dirname, "./src/Demo/Demo.fsproj"),
    },
    output: {
        path: path.join(__dirname, "./bin/Fable"),
        filename: "[name].js",
    },
    devServer: {
        contentBase: path.join(__dirname, "./bin/Fable"),
        port: 8080,
        host: '0.0.0.0',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        clientLogLevel: 'error'

    },
    devtool: production ? false : "eval-source-map",
    module: {
        rules: [
			{
				test: /\.fs(x|proj)?$/,
				use: {
					loader: "fable-loader"
				}
			}
        ]
    },
	plugins: [
	  new CopyPlugin([
	    { from: path.join(__dirname, "./src/Demo/index.html"), to: path.join(__dirname, "./bin/Fable/index.html") }
	  ]),
      new CopyPlugin([
            { from: path.join(__dirname,'./index.css') }
        ])
    ]
}