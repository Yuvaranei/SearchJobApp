const path = require('path');

module.exports = {
    entry: "./js/app.js",
    output : {
        path : path.resolve(__dirname),
        filename : "test-bundler.js"
    },
    mode : "development",
    module :{
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            },
            {       
                test : /\.(css|scss)$/,
                exclude : /node_modules/,
                loader: ['style-loader','css-loader','sass-loader']
            },
            {
				test: /\.jpe?g|png|gif|svg|woff|ttf|eot$/,
				loader:  ['url-loader']
            },
            {
                test: /\.csv$/,
                use : {
                    loader: 'csv-loader',
                    options: {
                        dynamicTyping: true,
                        header: true,
                        skipEmptyLines: true
                      }
                }
                
            }
        ]
    }
}