const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const staticPath = path.resolve(__dirname, "octoprint_themeify/static");
module.exports = {
    entry: [
        path.join(staticPath, "js", "themeify.js"),
        path.join(staticPath, "less", "base.less")
    ],
    output: {
        filename: "themeify.min.js",
        path: path.join(staticPath, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { url: false, minimize: true }
                        },
                        {
                            loader: "less-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false
        }),
        new ExtractTextPlugin({
            filename: "../dist/themeify.min.css",
            disable: false,
            allChunks: true
        })
    ]
};
