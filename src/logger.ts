import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import moment from "moment";

function time_stamp_format() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
}

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
                timestamp: time_stamp_format
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
                timestamp: time_stamp_format
            }
        }),
        new (winston.transports.Console)({
            level: 'debug'
        })
    ]
});

export default logger;