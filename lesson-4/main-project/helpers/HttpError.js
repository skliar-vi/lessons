const messages = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
}

const HttpError = (status, mesage = messages[status]) => {
    const error = new Error(mesage)
    error.status = status;

    return error;
}

module.exports = HttpError;