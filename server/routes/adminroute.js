const express = require('express');
const {addInMessageSentToAdmin,addMessageIdinAdmin, registeredAdmins ,
 getEmailAndUsernameOfAdmins, buyPlan, stripePayment, addPaymentIdinAdmin,
  addInMessageSentToSuperAdmin,addMessageIdinSuperAdmin, addpaymentidinsuperadmin,
 getTotalPaymentsAndMessages, getAdminData, updateActivePlan, getMessagesOnAdminDashboard,
  getPaymentsOnAdminDashboard, getOrders, getAppointmentsOnAdminDashboard,
   getJobApplicationsOnAdminDashboard,checksubdomainavailability,
   getMessages, addInPublishedWebsites,addPublishIDinAdmin } =require('../controllers/admin.controller');
const { mailerAdminMessages }= require("./../controllers/maileradminmessages");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const router = express.Router();

router.get('/registeredadmins', registeredAdmins);
router.get('/getadminsdata', getEmailAndUsernameOfAdmins);
router.get('/getMessages/:templateId',getMessages)
router.get('/getOrders/:templateId', getOrders )





router.post('/buyplan', buyPlan);
router.post("/stripe/charge", stripePayment ) 
router.put('/addpaymentidinadmin', addPaymentIdinAdmin)
router.post('/addpaymentidinsuperadmin', addpaymentidinsuperadmin)
router.post('/addinmessagesenttosuperadmin', addInMessageSentToSuperAdmin)
router.post('/addmessageidinsuperadmin', addMessageIdinSuperAdmin)
router.get('/gettotalpaymentsandmessages', getTotalPaymentsAndMessages)
router.post('/getadmindata', getAdminData);
router.put('/updateactiveplan', updateActivePlan);
router.post('/getmessagesonadmindashboard', getMessagesOnAdminDashboard)
router.post('/getpaymentsonadmindashboard', getPaymentsOnAdminDashboard)

router.post('/maileradminmessages',mailerAdminMessages)
router.post('/getpaymentsonadmindashboard', getPaymentsOnAdminDashboard)
router.post('/getappointmentsonadmindashboard',getAppointmentsOnAdminDashboard)
router.post('/getjobapplicationsonadmindashboard',getJobApplicationsOnAdminDashboard)
router.post('/addinmessagesenttoadmin',addInMessageSentToAdmin)
router.post('/addmessageidinadmin',addMessageIdinAdmin)
router.post('/checksubdomainavailability',checksubdomainavailability)
router.post('/addinpublishedwebsites',addInPublishedWebsites)
router.post('/addpublishIDinadmin',addPublishIDinAdmin)

module.exports = router;