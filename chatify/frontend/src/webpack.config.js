// webpack.config.js
module.exports = {
    // Other configuration settings
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',  // Disable source maps in production
    // ... other settings
  };
  