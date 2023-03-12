const express = require('express');
const { registeredAdmins , getEmailAndUsernameOfAdmins, buyPlan, stripePayment, addPaymentIdinAdmin, addInMessageSentToSuperAdmin,addMessageIdinSuperAdmin, addpaymentidinsuperadmin, getTotalPaymentsAndMessages, getAdminData, updateActivePlan} =require('../controllers/admin.controller');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const router = express.Router();

router.get('/registeredadmins', registeredAdmins);
router.get('/getadminsdata', getEmailAndUsernameOfAdmins);
router.post('/buyplan', buyPlan);
router.post("/stripe/charge", stripePayment ) 
router.put('/addpaymentidinadmin', addPaymentIdinAdmin)
router.post('/addpaymentidinsuperadmin', addpaymentidinsuperadmin)
router.post('/addinmessagesenttosuperadmin', addInMessageSentToSuperAdmin)
router.post('/addmessageidinsuperadmin', addMessageIdinSuperAdmin)
router.get('/gettotalpaymentsandmessages', getTotalPaymentsAndMessages)
router.post('/getadmindata', getAdminData);
router.put('/updateactiveplan', updateActivePlan);


module.exports = router;