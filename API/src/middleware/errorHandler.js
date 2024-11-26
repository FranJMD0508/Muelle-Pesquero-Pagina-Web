// Centralized error Handling

const errorHandling = (err,req,res,next) => {
    console.log(err.stack);
    res.status(500).json({
        status: 500,
        message: "Algo salio mal",
        error: err.message,
    });
};

export default errorHandling