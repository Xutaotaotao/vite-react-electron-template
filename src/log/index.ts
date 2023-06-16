const log4js = require('log4js');
const path = require('path');
const { app } = require('electron');

const LOG_PATH = path.join(app.getAppPath(), "log4.log")

log4js.configure({
  appenders: { 
    out: { type: 'stdout' },
    app: { type: 'file', filename: LOG_PATH }
  },
  categories: { 
    default: { appenders: ['out', 'app'], level: 'info' } 
  }
});

const logger = log4js.getLogger();

export default logger