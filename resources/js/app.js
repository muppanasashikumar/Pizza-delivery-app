import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let buttons = document.querySelectorAll('.buttons')
let removeFromCart = document.querySelectorAll('.remove-from-cart')
let cartCounter = document.querySelector('#cart-counter')

function updateCart(pizza) {
    axios.post('/update-cart',pizza).then((res) => {
        //console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to Cart'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong'
        }).show();
    })
}


function deductCart(pizza) {
    axios.post('/deduct-cart',pizza).then((res) => {
        //console.log(res)
        cartCounter.innerText = res.data.totalQty
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click',(e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        //console.log(e.currentTarget.className)
        updateCart(pizza)
    })
})

removeFromCart.forEach((btn) => {
    btn.addEventListener('click',(e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        //console.log(e.currentTarget.className)
        deductCart(pizza)
    })
})