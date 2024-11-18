// vue.config.js
module.exports = {
  // Configuración del servidor de desarrollo
  devServer: {
    port: 8080, // El puerto en el que se ejecutará la aplicación
    open: true, // Abre automáticamente el navegador cuando se inicie el servidor
  },
  // Otras configuraciones personalizadas que necesites
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true, // Habilitar el linter en guardado
  productionSourceMap: false, // Deshabilitar los source maps en producción para optimizar el rendimiento
};
