const keys = require('./keys.json');

// Update Webpack config; ENV-dependent
exports.webpack = function (config, env) {
  
  let { webpack, production } = env
  
  config.plugins.push(
    new webpack.DefinePlugin({
      APP_ORIGIN: "'http://localhost:8080'",
      OAUTH_URL: "'https://www.figma.com/oauth'",
      OAUTH_CALLBACK: production ? "'https://figslides.com/auth'" : "'http://localhost:8080/auth'",
      OAUTH_CLIENT_ID: `"${keys.DEV_OAUTH_CLIENT_ID}"`,
      OAUTH_CLIENT_SECRET: `"${keys.DEV_OAUTH_CLIENT_SECRET}"`
    })
  );

};