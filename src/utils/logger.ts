import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import moment from "moment";

function time_format() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
}

const myFormat = winston.format.printf((info) => {
  if (info && info instanceof Error) {
    return `${info.timestamp} ${info.level} ${info.message} : ${info.stack}`;
  }
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    transports: [
        new (winstonDaily)({
            filename: './log/server',
            options: {
                name: 'info-file',
                datePattern: '_yyyy-MM-dd.log',
                colorize: false,
                maxsize: 50000000,
                maxFiles: 1000,
                level: 'info',
                showLevel: true,
                json: false,
                timestamp: time_format
            }
        }),
        new (winston.transports.Console)({
            level: 'debug'
        })
    ],
    exceptionHandlers: [
        new (winstonDaily)({
            filename: './log/exception',
            options: {
                name: 'exception-file',
                datePattern: '_yyyy-MM-dd.log',
                colorize: false,
                maxsize: 50000000,
                maxFiles: 1000,
                level: 'error',
                showLevel: true,
                json: false,
                timestamp: time_format
            }
        }),
        new (winston.transports.Console)({
            level: 'debug'
        })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.splat(),
        myFormat
    )
});

export default logger;