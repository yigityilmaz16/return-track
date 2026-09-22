function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      message: "Geçersiz ürün ID'si",
    })
  }

  console.error(`${req.method} ${req.originalUrl}`, error)
  return res.status(500).json({
    message: 'Sunucu hatası',
  })
}

export default errorMiddleware
