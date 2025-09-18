class ApiResponse {
    static success(res, data, message = 'Success') {
        return res.status(200).json({
            code: 200,
            message,
            data
        });
    }
    static error(res, message = 'Error', statusCode = 500) {
        return res.status(statusCode).json({
            code: 201,
            message
        });
    }  
}

export default ApiResponse;