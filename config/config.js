var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'weblombardfront'
    },
    port: 3000,
    db: 'postgres://postgres:test123@localhost/WLFront'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'weblombardfront'
    },
    port: 3000,
    db: 'postgres://postgres:test123@localhost/WLFront'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'weblombardfront'
    },
    port: 3000,
    db: 'postgres://postgres:test123@localhost/WLFront'
    
  }
};

module.exports = config[env];
