const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

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

    app.post('/orders',orderController().store)
    app.get('/customer/orders',orderController().index)
    app.get('/customer/orders/:id',orderController().show)

    //admin routes
    app.get('/admin/orders',admin,adminOrderController().index)

    app.post('/admin/order/status',admin,statusController().update)




}

module.exports = initRoutes