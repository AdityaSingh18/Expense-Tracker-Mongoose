const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user')

require('dotenv').config()

exports.purchasepremium = (req,res,next)=>{
    try {
        var instance = new Razorpay({key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET});
        var options = {
            amount: 100000,
            currency: "INR",
            receipt: 'xyz'
        };

        instance.orders.create(options, (err, order) => {
            if(err){
                throw new Error(err);
            }
            res.json({order, key_id: instance.key_id});
            
        });
    } catch (err) {
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}

exports.updateTransactionStatus = async(req,res,next)=>{
    try {
        const {razorpay_payment_id , razorpay_order_id , razorpay_signature} = req.body ;

        let order = await Order.create({
            paymentId:razorpay_payment_id,
            orderId:razorpay_order_id,
            signature:razorpay_signature,
            status:"successful",
            userId:req.user._id
        })

        console.log(order);
        if(order.status == "successful" ){
            console.log('sucesss')

            let user = await  User.findById(req.user._id);
            console.log(user);
            user.ispremiumuser = true ;
            await user.save();
            res.status(200).json({message: "Successfully Saved"});
        }
    
    } catch (error) {
        res.status(403).json({ error: error, message: 'Sometghing went wrong' })
    }
}
