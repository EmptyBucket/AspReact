var Path = require("path");
var WebpackNotifierPlugin = require("webpack-notifier");
var Webpack = require("webpack");
var Chalk = require("chalk");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require("assets-webpack-plugin");

var BuildMode = {
    Production: "production",
    Development: "development",
    DevelopmentWithoutDevtool: "developmentWithoutDevtool",
    DevelopmentRebuildFast: "developmentRebuildFast"
}

var NodeEnv = process.env.NODE_ENV || Development;
console.log(Chalk.magenta(`Execute mode: ${NodeEnv}`));

module.exports = {
    context: Path.join(__dirname, "TestApp"),
    entry: {
        testBootstrap: "./index.js"
    },
    output: {
        path: Path.join(__dirname, "Bundles"),
        filename: "[name]-[chunkhash].js",
        publicPath: "/Bundles/",
        chunkFilename: "[id]-[chunkhash].js"
    },
    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js"]
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js", ".loader.js"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel?plugins=transform-runtime&presets[]=es2015&presets[]=react"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel?plugins=transform-runtime&presets[]=es2015"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!autoprefixer?browsers=last 2 version!postcss!sass")
            },
            { test: /\.(eot|png|jpg)$/, loader: "file?name=[name]-[hash:6].[ext]" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=[name]-[hash:6].[ext]&limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=[name]-[hash:6].[ext]&limit=10000&minetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=[name]-[hash:6].[ext]&limit=10000&minetype=image/svg+xml" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name]-[contenthash].css", { allChunks: true }),
        new Webpack.NoErrorsPlugin(),
        new Webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NodeEnv)
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.OldWatchingPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new WebpackNotifierPlugin(),
        new AssetsPlugin({
            path: Path.join(__dirname)
        })
    ]
};

if (NodeEnv === BuildMode.Production) {
    console.log(Chalk.bgYellow("Using plugins: UglifyJsPlugin, DedupePlugin"));
    module.exports.plugins.push(new Webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }),
    new Webpack.optimize.DedupePlugin());
}

if (NodeEnv === BuildMode.Development || NodeEnv === BuildMode.Production) {
    console.log(Chalk.bgYellow("Using devtool: source-map"));
    module.exports.devtool = "source-map";
}

if (NodeEnv === BuildMode.DevelopmentRebuildFast) {
    console.log(Chalk.bgYellow("Using devtool: eval"));
    module.exports.devtool = "eval";
}
