const userDAO = require('../db/daos/user');

async function login(username, password) {
    if(validateUsernameAndPassword(username, password)) {
        const user = await userDAO.getUserByNameAndPassword(username, password);
        if(!user) {
            throw new Error(`User not found with username: "${username}", password: "${password}"`);
        } else {
            return user;
        }
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
    login
};
