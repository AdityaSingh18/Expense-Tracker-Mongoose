const Expense = require('../models/expense');
const User = require('../models/user')
const Downloadurl = require('../models/downloadurls')
const AWS = require('aws-sdk');
const UserServices = require('../services/userservices');
const S3Services = require('../services/S3services')

exports.postExpense  =  async (req,res,next)=>{
    const {amount, description, category} = req.body ;
    try {
        if(!amount || !description || !category){
            return res.status(400).json({message:'add all fields'})
        }
        const data = await Expense.create({amount, description, category , userId:req.user._id})
        res.status(201).json({data ,  message:'sucessfully added expense'})
    } catch (error) {
        res.status(500).json({message:'unable to add expwnse'})
    }
}

// let limit_items  ;

exports.getExpenses = async(req,res,next)=>{

    let page = req.params.pageno || 1
    let limit_items = +(req.body.itemsPerPage) || 5 ;
    // console.log(+(req.body.itemsPerPage))
    let totalItems 

    try {
        let count = await Expense.find().count()
        totalItems = count ; 

        let data = await Expense.find({userId: req.user.id}).skip((page-1)*limit_items).limit(limit_items)

        res.status(200).json({data ,
            info: {
              currentPage: page,
              hasNextPage: totalItems > page * limit_items,
              hasPreviousPage: page > 1,
              nextPage: +page + 1,
              previousPage: +page - 1,
              lastPage: Math.ceil(totalItems / limit_items),
            }})
    } catch (error) {
        res.status(500).json({message:'unable to get expwnse'})
    }
    
}

exports.deleteExpense = async(req,res,next)=>{
    try {
        const expenseId = req.params.expenseid ;
        console.log(expenseId)
        let expense = await Expense.findById(expenseId)
        // console.log(expense)
        if(!expense){
            return res.status(404).json({message:'expense not found'})
        }
        if(expense.userId.toString() !== req.user._id.toString()){
            return res.status(401).json("Not Allowed");
        }
        await Expense.findByIdAndRemove(expenseId)
        res.status(200).json({message:'deleted sucessfully'})
        
    } catch (error) {
        res.status(500).json({message:'unable to delete expwnse'})
    }
}

exports.getAllUserExpenses = async(req,res,next)=>{
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

exports.getLeaderboardUserExpense = async(req,res,next)=>{
    try {
        if(req.user.ispremiumuser){
            let userId = req.params.loadUserId;
            console.log(userId)
            console.log('##############################S')
            // let user = await User.findOne({where:{id:userId}})

            const expenses = await Expense.find({userId:userId});
            
           return res.status(200).json({success:true , data: expenses })
        }
        return res.status(400).json({message : 'user is not premium user' });
    } catch (error) {
        res.status(500).json({success : false, data : error});
    }
}

exports.downloadExpense = async(req,res,next)=>{
    try {
        const userId = req.user._id ;

        const expenses = await Expense.find({userId})
        // const expenses = await req.user.getExpenses();
        
        //expenses is an array we cannot write array to file, so we convert to string.
        const stringifyExpense = JSON.stringify(expenses);
        const fileName = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await S3Services.uploadToS3( stringifyExpense , fileName) ;

        const downloadUrlData = await Downloadurl.create({
            fileUrl:fileURL,
            fileName,
            userId:req.user._id
        })

        res.status(200).json({ fileURL, downloadUrlData , success: true });

    } catch (err) {
        res.status(500).json({fileURL: "", success: false, err: err});
    }
}

exports.downloadAllUrl = async(req,res,next) => {
    try {
        let urls = await Downloadurl.find({userId:req.user._id}) ;
        if(!urls){
            res.status(404).json({ message:'no urls found with this user' , success: false});
        }
        res.status(200).json({ urls , success: true })
    } catch (error) {
        res.status(500).json({ err})
    }
}
