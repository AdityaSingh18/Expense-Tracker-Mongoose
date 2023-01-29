const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const dowmloadSchema = new Schema({
    fileName:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = mongoose.model('Downloadurl' , dowmloadSchema)

// const Sequelize =require('sequelize');
// const sequelize = require('../util/database');

// const Downloadurl = sequelize.define('downloadurl' , {
//     id:{
//         type:Sequelize.INTEGER,
//         unique:true,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true,
//     },
//     fileName:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     fileUrl:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     }
// })

// module.exports = Downloadurl