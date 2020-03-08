const userDAO = require('../db/daos/user');
const jwt = require('jsonwebtoken');

async function login(username, password) {
    if(validateUsernameAndPassword(username, password)) {
        const user = await userDAO.getUserByNameAndPassword(username, password);

        if(!user) {
            throw new Error(`User not found with username: "${username}", password: "${password}"`);
        } else {
            const privateKey = getPrivateUserKey();

            return createUserToken(user.id, privateKey);
        }
    } else {
        throw new Error('Invalid username or password');
    }
}

function getPrivateUserKey() {
    const encodedPrivateKey = process.env.USER_MANAGEMENT_PRIVATE_KEY;
    const privateKeyBuffer = new Buffer.from(encodedPrivateKey, 'base64');
    return privateKeyBuffer.toString('ascii').trim();
}

function getPublicUserKey() {
    const encodedPublicKey = process.env.USER_MANAGEMENT_PUBLIC_KEY;
    const publicKeyBuffer = new Buffer.from(encodedPublicKey, 'base64');
    return publicKeyBuffer.toString('ascii').trim();
}

function createUserToken(userId, privateKey) {
    const data = {
        id: userId
    };

    return jwt.sign({
            data: data
        },
        privateKey,
        {
            algorithm: process.env.USER_TOKEN_ALGORITHM,
            expiresIn: process.env.USER_TOKEN_EXPIRATION_TIME
        }
    );
}

function validateUserToken(token) {
    const algorithm = process.env.USER_TOKEN_ALGORITHM;
    const publicKey = getPublicUserKey();

    return jwt.verify(token, publicKey, { algorithm: algorithm }, (error, decoded) => {
        if (error) {
            if(error.name === "TokenExpiredError") {
                throw new Error('User token expired');
            } else {
                throw new Error('Invalid user token');
            }
        } else {
            return decoded.data.id;
        }
    });
}

async function createUser(username, password) {
    if(validateUsernameAndPassword(username, password)) {
        return await userDAO.createUser(username, password);
    } else {
        throw new Error('Invalid username or password');
    }
}

/*
* Not accepted:
* - boolean values: "true", "false"
* - numbers only: "0", "-100", etc
* - empty username or password
*/
function validateUsernameAndPassword(username, password) {
    return !isFinite(username) && !isFinite(password) &&
        (username !== 'false' && password !== 'false'
        && username !== 'true' && password !== 'true')
        && !!(username && password);
}

module.exports = {
    login,
    validateUserToken,
    createUser
};
