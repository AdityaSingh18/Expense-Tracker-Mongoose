const User = require('../models/users')
const Expense = require('../models/expense')
const sequelize = require('../util/database')
const e = require('express')

const getUserLeaderBoard = async (req,res)=>{
    try {

        if(req.user.ispremiumuser){
            let leaderboard = [];
            let users = await User.find().select("id name email")

            console.log(users);

            for(let i = 0 ;i<users.length ; i++){
                let expenses = await  Expense.find({userId:users[i]._id}) ;
                let totalExpense = 0;
                for(let j = 0 ;j<expenses.length ; j++){
                    totalExpense += expenses[j].amount
                }
                let userObj = {
                    user:users[i],
                    expenses,
                    totalExpense
                }
                leaderboard.push(userObj);
            }
           return res.status(200).json({success : true, data : leaderboard});
        }

        return res.status(400).json({message : 'user is not premium user' });

    } catch (error) {
        res.status(500).json({success : false, data : error});
    }
}

module.exports= {
    getUserLeaderBoard
}