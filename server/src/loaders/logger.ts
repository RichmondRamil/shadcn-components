import config from '@/config';
import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';

const formatOut = bunyanFormat({ outputMode: 'short' });
const stream: bunyan.Stream = {
	level: config.logs.level as bunyan.LogLevel,
	stream: formatOut,
};

const loggConfig: bunyan.LoggerOptions = {
	name: config.logs.name,
	level: config.logs.level as bunyan.LogLevel,
	streams: [stream],
	serializers: bunyan.stdSerializers,
	src: true,
};

const logger = bunyan.createLogger(loggConfig);

export type loggerType = bunyan;

export default logger;

// Using Winston
// import winston from 'winston';
// const transports = [];
// if (process.env.NODE_ENV !== 'development') {
//   transports.push(new winston.transports.Console());
// } else {
//   transports.push(
//     new winston.transports.Console({
//       format: winston.format.combine(winston.format.cli(), winston.format.splat()),
//     }),
//   );
// }

// const LoggerInstance = winston.createLogger({
//   level: config.logs.level,
//   levels: winston.config.npm.levels,
//   format: winston.format.combine(
//     winston.format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     winston.format.errors({ stack: true }),
//     winston.format.splat(),
//     winston.format.json(),
//   ),
//   transports,
// });

// export default LoggerInstance;
