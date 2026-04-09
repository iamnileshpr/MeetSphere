const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500; //error meassage will show else by default 500 error will be show
    let message = err.message | 'Interval server error' //error message

    if (err.name == 'validationErro') { //to handle mongooose error
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ')
    }

    //to handle duplicate errori i.e if two person using same email

    if (err.code == 1100) {
        statusCode = 400;
        message = "Duplicate value entered"
    }

    //JWT
    if (err.name == 'jsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid Token'
    }
    if (err.name == 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token Expired'
    }
    console.error("Error", err);

    res.status(statusCode).json({
        success: false,
        error: message
    })
}

export default errorHandler;