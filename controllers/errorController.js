const globalErrorHandler = (error, req, res, next) => {
    const { status = 500, message = "Server error", data } = error;
    res.status(status).json({ message, data });
  };
  
export default globalErrorHandler;