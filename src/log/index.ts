const log4js = require('log4js');
const path = require('path');

const LOG_PATH = '/Users/Shared'

log4js.configure({
  appenders: { 
    out: { type: 'stdout' },
    app: { type: 'file', filename: path.join(LOG_PATH, "log") }
  },
  categories: { 
    default: { appenders: ['out', 'app'], level: 'info' } 
  }
});

const logger = log4js.getLogger();

export default logger