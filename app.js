const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
// const sequelize = require('./util/database');
const cors = require('cors');
const helmet = require("helmet");
const compression = require('compression')
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose')
// const https = require('https');
try{


const accessLogStream = fs.createWriteStream('access.log', {flag: 'a'})

// const User = require('./models/user');
// const Expense = require('./models/expense');
// const Order =require('./models/order');
// const Forgotpassword = require('./models/forgotpassword');
// const Downloadurl = require('./models/downloadurls');

const userRouter = require('./routes/user');
const expenseRouter =require('./routes/expense');
const purchaseRouter = require('./routes/purchase')
const forgetpassRouter = require('./routes/forgetpass')

// const privateKey = fs.readFileSync('server.key')
// const certificate = fs.readFileSync('server.cert'); 

app.use(express.json())

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.json({extended:false}))

app.use('/user' , userRouter )
app.use('/expense' , expenseRouter )
app.use('/payment' , purchaseRouter)
app.use('/password' , forgetpassRouter)

// Expense.belongsTo(User);
// User.hasMany(Expense);

// User.hasMany(Order);
// Order.belongsTo(User);

// Forgotpassword.belongsTo(User);
// User.hasMany(Forgotpassword);

// Downloadurl.belongsTo(User);
// User.hasMany(Downloadurl);
console.log(process.env.MongoDB)
}
catch(err){
    console.log(err)
}
    
mongoose.connect(process.env.MongoDB)
.then(()=>{
    app.listen(3000 , (req,res)=>{
        console.log('running')
    })
})

