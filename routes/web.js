const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app) {
    homeController().index
    //Routes
    app.get('/', homeController().index)

    app.get('/cart',cartController().index)

    app.post('/update-cart',cartController().update)
    app.post('/deduct-cart',cartController().deduct)

    app.get('/login',authController().login)

    app.get('/register',authController().register)
}

module.exports = initRoutes