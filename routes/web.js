const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middleware/guest')

function initRoutes(app) {
    homeController().index
    //Routes
    app.get('/', homeController().index)

    app.get('/cart',cartController().index)

    app.post('/update-cart',cartController().update)
    app.post('/deduct-cart',cartController().deduct)

    app.get('/login',guest, authController().login)
    app.post('/login',authController().postLogin)

    app.post('/logout',authController().logout)

    app.get('/register',guest, authController().register)
    app.post('/register',authController().postRegister)

}

module.exports = initRoutes