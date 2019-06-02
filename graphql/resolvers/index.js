const authResolvers = require('./auth');
const mobileResolvers = require('./mobile');
const cartResolvers = require('./cart');

module.exports = {
    ...authResolvers,
    ...mobileResolvers,
    ...cartResolvers
};