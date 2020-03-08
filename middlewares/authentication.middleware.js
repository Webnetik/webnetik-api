const userService = require('../services/user');

function verifyUserToken(request, response, next) {
    if (validateAuthenticationHeader(request.headers)) {
        let token = getUserTokenFromHeaders(request.headers);

        if (!token) {
            request.error = "Wrong authentication";
        } else {
            try {
                request.userData = userService.validateUserToken(token);
            } catch(error) {
                request.error = error.message;
            }
        }
    } else {
        request.error = "Missing authentication";
    }

    next();
}

function validateAuthenticationHeader(headers) {
    return !!headers.authorization;
}

function getUserTokenFromHeaders(headers) {
    return headers.authorization.split(" ")[1];
}

module.exports = verifyUserToken;
