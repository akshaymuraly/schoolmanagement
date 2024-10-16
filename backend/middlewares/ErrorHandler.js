const ErroHandler = (err, req, res, next) => {
  return res
    .status(err?.error_code || 500)
    .json({ message: err?.message || "Internal server error!", status: false });
};

module.exports = ErroHandler;
