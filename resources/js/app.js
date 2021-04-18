import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
import { initAdmin } from './admin'

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

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}



// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}




updateStatus(order);

// //Socket
 let socket = io()
 initAdmin(socket)
// //Join
 if(order) {
     socket.emit('join',`order_${order._id}`)
 }

 let adminAreaPath = window.location.pathname
 if(adminAreaPath.includes('admin')) {
    socket.emit('join','adminRoom')
 }

 socket.on('orderUpdated', (data) => {
     const updatedOrder = {...order}
     updatedOrder.updatedAt = moment().format()
     updatedOrder.status = data.status
     updateStatus(updatedOrder)
     new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order Updated'
    }).show();
 })
