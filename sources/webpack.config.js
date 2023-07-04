const path                  = require('path');
const TerserPlugin          = require('terser-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');

module.exports = (production) => {
    let arr = {
        mode: production ? "production" : "development",
        entry: './js/script.js',
        output: {
            filename: 'script.js',
            path: path.resolve(__dirname, '../assets/js')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    }
    if (production) {
        arr.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 5,
                        format: {
                            comments: false
                        }
                    },
                    extractComments: false
                })
            ]
        }
        arr.plugins = [new CleanWebpackPlugin()]
        arr.performance = {
            hints: false
        }
    }

    return arr;
}
