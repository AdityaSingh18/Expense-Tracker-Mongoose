const express = require('express')
const premiumFeatureController = require('../controllers/premiumFeature')
const authenticatemiddleware = require('../middleware/auth')
const router = express.Router();

router.get('/showLeaderBoard',authenticatemiddleware.authentication,premiumFeatureController.getUserLeaderBoard)
module.exports=router;