const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/views/components/'),
      '@groupdetail': path.resolve(__dirname, 'src/views/components/groupdetail'),
      '@pages': path.resolve(__dirname, 'src/views/pages/'),
      '@styles': path.resolve(__dirname, 'src/views/styles/'),
      
    },
  },
};


