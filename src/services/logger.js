const { createLogger, format, transports } = require('winston');
const { ENV } = process.env;

const ignorePrivate = format(info => {
  if (info.private) {
    return false;
  }
  return info;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(ignorePrivate(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    ...(ENV === 'development'
      ? []
      : [
          new transports.File({
            filename: 'logs/errors.log',
            level: 'error',
          }),
          new transports.File({ filename: 'logs/output.log' }),
        ]),
  ],
});

module.exports = logger;
