const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const sanitizer = require('perfect-express-sanitizer');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour!',
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(
    sanitizer.clean({
      xss: true,
      noSql: true,
      sql: false, 
    })
);

app.use('/api/v1', limiter);

app.all('*', (req, res, next) => {
    return next(
      new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
    );
});

app.use(globalErrorHandler);


const authRouter = require('./routes/auth.routes');
const commentRouter = require('./routes/comment.routes');
const postRouter = require('./routes/posts.routes');
const userRouter = require('./routes/users.routes');

console.log(process.env.NODE_ENV);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

module.exports = app;