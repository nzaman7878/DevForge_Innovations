module.exports = function (err, req, res, next) {
  console.error(err.stack);
  
  const status = err.statusCode || 500;
  const msg = err.message || 'Server error';
  
  res.status(status).json({
    msg: msg,
    errors: err.errors || undefined
  });
};
