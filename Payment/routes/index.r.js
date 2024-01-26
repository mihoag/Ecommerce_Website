const tkgdRoute = require('./taikhoangd.r')
const gdttRoute = require('./gdthanhtoan.r')

function route(app) {
    app.use('/tkgd', tkgdRoute);
    app.use('/gdtt', gdttRoute);
}
module.exports = route;