/**
 * Error Handler Middleware
 * Handles all errors thrown in the application
 */

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong MongoDB ID error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = { statusCode: 400, message };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value: ${Object.keys(err.keyValue).join(', ')}`;
    err = { statusCode: 400, message };
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    err = { statusCode: 401, message };
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired';
    err = { statusCode: 401, message };
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  });
};

module.exports = errorHandler;
