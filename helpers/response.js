
module.exports = {
    statusCode: null,
    type: null,
    message: null,
    data: null, 
    setSuccess: function(statusCode, message, data) {
        this.statusCode = statusCode;
        this.type = 'success';
        this.message = message;
        this.data = data;
    },
    setError: function(statusCode, message) {
        this.statusCode = statusCode;
        this.type = 'error';
        this.message = message;
    },
    send: function(res) {
        const result = {
            status: this.type,
            message: this.message,
            data: this.data,
        };
        if (this.type === 'error') {
            return res.status(this.statusCode).json({
                status: this.type,
                message: this.message
            });
        }
        return res.status(this.statusCode).json(result);
    }    
}