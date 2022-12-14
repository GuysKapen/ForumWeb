require('dotenv').config()
const host = process.env.DB_HOST || 'localhost';

module.exports = {
  server: {
    port: 9000
  },
  database: {
    url: host,
    properties: {
    }
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInSeconds: 86400 
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 240
  }
};
