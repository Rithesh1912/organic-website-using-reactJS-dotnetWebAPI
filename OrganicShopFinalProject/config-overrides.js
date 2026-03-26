const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    buffer: require.resolve('buffer'),
    process: require.resolve('process'), 
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: 'process',   
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return config;
};
