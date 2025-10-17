module.exports = function (config) {
  config.set({
    // 🔹 Frameworks de testing
    frameworks: ['jasmine'],

    // 🔹 Archivos que contienen las pruebas
    files: [
      { pattern: 'src/**/*.test.jsx', watched: false }
    ],

    // 🔹 Preprocesadores
    preprocessors: {
      'src/**/*.test.jsx': ['webpack']
    },

    // 🔹 Configuración de Webpack para JSX y React
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    // 🔹 Reportes y navegador
    reporters: ['progress'],
    browsers: ['Chrome'],

    // 🔹 Ejecución única (desactivar para debug)
    singleRun: true,
  });
};
