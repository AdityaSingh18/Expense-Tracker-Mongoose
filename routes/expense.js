const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');
const middleware = require('../middleware/auth');

router.post('/add-expense' , middleware.authentication, expenseController.postExpense );

router.post('/:pageno' , middleware.authentication,  expenseController.getExpenses)

router.delete('/delete-expense/:expenseid', middleware.authentication, expenseController.deleteExpense )

router.get('/premium-leaderboard' , middleware.authentication , expenseController.getAllUserExpenses )

router.get('/getInfo/:loadUserId' , middleware.authentication , expenseController.getLeaderboardUserExpense)

router.get('/download' , middleware.authentication ,expenseController.downloadExpense )

router.get('/getAllDownloadUrl' , middleware.authentication ,expenseController.downloadAllUrl )

module.exports = router ;

