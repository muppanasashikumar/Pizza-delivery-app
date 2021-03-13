const Menu = require('../../models/menu')

function homeController() {
    return {
       async index(req,res) {
           //To fetch pizzas from DB
           const pizzas = await Menu.find()
           return res.render('home',{pizzas: pizzas})
        //    Menu.find().then((pizzas) => {
        //        console.log(pizzas)
        //     return res.render('home',{pizzas: pizzas})
        //    })
        
       } 
    }
}

module.exports = homeController