/// <binding ProjectOpened='Watch - Development' />

var path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
var webpack = require('webpack');

var developmentConst = "development";
var productionConst = "production";
var NODE_ENV = process.env.NODE_ENV || developmentConst;

module.exports = {
    context: __dirname + "/App",
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "Bundles"),
        filename: "[name].bundle.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js"]
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"],
        moduleTemplates: ["*-loader"],
        extensions: ["", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    plugins: [],
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /.css$/,
                loader: "style!css!autoprefixer?browsers=last 2 version",
                include: /Content/
            },
            {
                test: /.(png|jpg|svg|ttf|eot|wof|woff2)$/,
                include: /node_modules/,
                loader: "file?name=[1].[ext]&regExp=node_modules/(.*)"
            },
            {
                test: /.(png|jpg|svg|ttf|eot|wof|woff2)$/,
                exclude: /node_modules/,
                loader: "file?name=[path][name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new WebpackNotifierPlugin()
    ]
};

if (NODE_ENV === developmentConst) {
    module.exports.devtool = "eval";
    module.exports.module.loaders[0].query.plugins.push("transform-runtime");
}
if (NODE_ENV === productionConst) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }));
}
