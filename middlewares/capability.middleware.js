const userDAO = require('../db/daos/user');
const userService = require('../services/user');

async function validateCapabilities(request, response, next, neededCapabilities) {
    if(!request.error) {
        const user = await userDAO.getUserById(request.userId);
        const roles = await user.getRoles();

        let userCapabilities = await collectUserCapabilities(roles);
        const enabled = isFeatureEnabledForUser(neededCapabilities, userCapabilities);

        if(!enabled) {
            request.error = "User is not capable to use this feature";
        }
    }

    next();
}

async function collectUserCapabilities(userRoles) {
   const capabilities = await Promise.all(
        userRoles.map(async role => {
            let caps = await role.getCapabilities();
            return caps.map(cap => cap.name);
        })
   );
   return capabilities.flat();
}

function isFeatureEnabledForUser(neededCapabilities, userCapabilities) {
    const unionOfCapabilities = neededCapabilities.filter(cap => userCapabilities.includes(cap));
    return unionOfCapabilities.length > 0;
}

module.exports = validateCapabilities;