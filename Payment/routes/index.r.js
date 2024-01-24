const tkgdRoute = require('./taikhoangd.r')

function route(app) {
    app.use('/tkgd', tkgdRoute);
}
module.exports = route;