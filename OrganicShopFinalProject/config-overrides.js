const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    // Add other node core modules here as needed
  };

  // You can also add plugins, loaders, etc. here.
  return config;
};