const express =require('express');
const router = express.Router();

const purchaseController = require('../controllers/purchase');
const middleware = require('../middleware/auth');

router.post('/premiummembership' , middleware.authentication , purchaseController.purchasepremium )

router.post('/updatestatus' , middleware.authentication , purchaseController.updateTransactionStatus)

module.exports = router;