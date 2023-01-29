const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    paymentId: String,
    orderId: String,
    signature: String,
    status: String,
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = mongoose.model('Order' , orderSchema)

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     paymentId: Sequelize.STRING,
//     orderId: Sequelize.STRING,
//     signature: Sequelize.STRING,
//     status: Sequelize.STRING
// })

// module.exports = Order;