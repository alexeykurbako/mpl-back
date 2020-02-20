

module.exports = {

  api: {
    port: 3001,
    root: '/api',
  },

  frontEnd: {
    domain: 'http://localhost:4200',
  },

  db: {
    url: 'mongodb://localhost:27017/mpl',
    name: 'mpl',
  },

  logger: {
    console: {
      level: 'debug',
    },
    file: {
      logDir: 'logs',
      logFile: 'mpl.log',
      level: 'debug',
      maxsize: 1024 * 1024 * 10, // 10MB
      maxFiles: 5,
    },
  },
};
