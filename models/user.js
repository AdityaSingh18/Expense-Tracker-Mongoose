const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    ispremiumuser :{
        type : Boolean,
        default:false
    },
    expenses:[{expenseId:{type:Schema.Types.ObjectId , ref:'Expense' }}]
})

module.exports = mongoose.model('User' , userSchema)

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database')

// const User = sequelize.define('user' , {
//     id:{
//         type:Sequelize.INTEGER,
//         unique:true,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true,
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     email:{
//         type:Sequelize.STRING,
//         unique:true,
//         allowNull:false,
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     ispremiumuser: Sequelize.BOOLEAN
// })

// module.exports = User;