var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var angularExternals = require('webpack-angular-externals');
var rxjsExternals = require('webpack-rxjs-externals');

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());

module.exports = {
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/dist/',
    filename: 'ngx-click-to-edit.js',
    libraryTarget: 'umd',
    library: 'ngxClickToEdit'
  },
  externals: [
        angularExternals(),
        rxjsExternals()
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader?emitErrors=true&failOnHint=true',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/
            }
        ]
  },
  resolve: {
    extensions: ['.ts', '.js']
    },
    plugins  : [
        new webpack.optimize.UglifyJsPlugin({
            include  : /\.min\.js$/,
            sourceMap: true
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(__dirname, 'src')
        ),
        new webpack.BannerPlugin({
            banner   : `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
      `.trim(),
            raw      : true,
            entryOnly: true
        })
    ]
};
