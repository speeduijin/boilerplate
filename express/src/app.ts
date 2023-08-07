import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';

import indexRouter from './routes/index';
import { notFoundMiddleware, errorHandler } from './middlewares';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(
    helmet({
      // contentSecurityPolicy: false,
      // crossOriginEmbedderPolicy: false,
      // crossOriginResourcePolicy: false,
    }),
  );
  app.use(hpp());
}
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  secret: process.env.COOKIE_SECRET!, // !: Non-Null
  resave: false,
  saveUninitialized: false,
  proxy: false,
  cookie: {
    httpOnly: true,
    secure: false, // true - https
  },
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));

app.use('/', indexRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
