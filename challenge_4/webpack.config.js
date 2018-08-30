module.exports = {
      entry: __dirname + '/client/index.jsx',
      module: {
        rules: [
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          }
        ]
      },
        output: {
          filename: 'app.js',
          path: __dirname + '/public'
        }
    };