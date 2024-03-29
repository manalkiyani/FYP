const Admin = require("../models/Admin");
const Payment = require("../models/Payment");
const Message = require("../models/Message");
const SuperAdmin = require("../models/SuperAdmin");
const Order = require("../models/Order");
const Template = require("../models/Template");
const PublishedWebsites = require("../models/publishedwebsites");
const mongoose = require("mongoose");
const { template } = require("lodash");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const registeredAdmins = (req, res) => {
  Admin.countDocuments({}, (err, count) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json({ count });
    }
  });
};
const getEmailAndUsernameOfAdmins = async (req, res) => {
  let totalLiveWebs = 0;
  try {
    const admins = await Admin.find(
      {},
      "email username activePlan savedTemplates"
    ); // Fetch users with only email and username fields
    const adminsData = admins.map((admin) => ({
      email: admin.email,
      username: admin.username,
      activePlan: admin.activePlan,
      savedTemplatesCount: admin.savedTemplates
        ? admin.savedTemplates.length
        : 0,
    }));
    console.log(adminsData);
    adminsData.forEach((admin) => {
      totalLiveWebs += admin.savedTemplatesCount;
    });
    console.log(totalLiveWebs);
    const responseData = {
      adminsData: adminsData,
      totalLiveWebs: totalLiveWebs,
    };
    res.json(responseData); // Send the user data and total live webs as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const buyPlan = async (req, res) => {
  const { amount, activePlan, paymentMethod, transID, approvedTrans } =
    req.body;

  console.log("REQUEST");
  console.log(req);
  const savePayment = Payment({
    _id: mongoose.Types.ObjectId(),
    amount,
    activePlan,
    paymentMethod,
    transID,
    approvedTrans,
  });

  return savePayment
    .save()
    .then((newPayment) => {
      console.log(newPayment);
      return res.status(201).json({
        success: true,
        message: "Payment stored successfully",
        payment: newPayment,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};
const stripePayment = async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};

const addPaymentIdinAdmin = async (req, res) => {
  const paymentID = req.body.paymentID;
  const adminID = req.body.adminID;

  try {
    const admin = await Admin.findById(adminID);

    if (!admin) {
      return res.status(404).send("Admin not found");
    }

    // Update transactionID field with the new value
    admin.transactionID = paymentID;

    // Save the updated Admin document
    await admin.save();

    // Send the updated Admin document back as the response
    console.log(admin);
    res.send(admin);
  } catch (err) {
    console.error(err.message + "THIS ISS ERROR");
    res.status(500).send("Server Error");
  }
};

const addInMessageSentToSuperAdmin = async (req, res) => {
  // this will add message that is sent to super admin in the message collection

  const { email, subject, message } = req.body;

  const saveMessage = Message({
    _id: mongoose.Types.ObjectId(),
    email,
    subject,
    message,
  });

  return saveMessage
    .save()
    .then((newMessage) => {
      console.log(newMessage);
      return res.status(201).json({
        success: true,
        message: newMessage,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

const addMessageIdinSuperAdmin = async (req, res) => {
  const messageID = req.body.messageID;
  const adminID = req.body.adminID;

  try {
    // add message id in messages array of super admin
    const superadmin = await SuperAdmin.findById(adminID);
    superadmin.messages.push(messageID);

    // Save the updated Super Admin document
    await superadmin.save();

    // Send the updated Admin document back as the response
    console.log(superadmin);
    res.send(superadmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addpaymentidinsuperadmin = async (req, res) => {
  const paymentID = req.body.paymentID;
  const adminID = req.body.adminID;

  try {
    // add message id in messages array of super admin
    const superadmin = await SuperAdmin.findById(adminID);
    superadmin.payments.push(paymentID);

    // Save the updated Super Admin document
    await superadmin.save();

    // Send the updated Admin document back as the response
    console.log(superadmin);
    res.send(superadmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const getTotalPaymentsAndMessages = async (req, res) => {
  try {
    const Superadmin = await SuperAdmin.findById("6403a03f270a91ab0e2925ad");

    console.log("********" + Superadmin.messages.length);
    console.log("************" + Superadmin.payments.length);

    res.json(Superadmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getAdminData = async (req, res) => {
  const id = req.body.ADMIN_ID;
  try {
    const admin = await Admin.findById(id).populate("transactionID", "amount");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const { username, email, activePlan } = admin;
    const amount = admin.transactionID ? admin.transactionID.amount : 0.0;
    res.status(200).json({ username, email, activePlan, amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateActivePlan = async (req, res) => {
  const adminID = req.body.adminID;
  const activePlan = req.body.activePlan;
  try {
    const admin = await Admin.findByIdAndUpdate(
      adminID,
      { activePlan: req.body.activePlan },
      { new: true }
    );
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.send(admin);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getMessagesOnAdminDashboard = async (req, res) => {
  try {
    console.log(req.body.ADMIN_ID);
    // find the SuperAdmin document with the specified ID and populate the "messages" array with Message data
    const admin = await Admin.findById(req.body.ADMIN_ID).populate(
      "messages",
      "subject email message"
    );

    // extract the relevant data from the populated "message" array
    const messagesData = admin.messages.map((message) => {
      return {
        id: message._id,
        message: message.message,
        email: message.email,
        subject: message.subject,
      };
    });

    // send the extracted data as a response to the frontend
    console.log(messagesData);
    res.json(messagesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal sdsdserver error" });
  }
};

const getPaymentsOnAdminDashboard = async (req, res) => {
  try {
    console.log(req.body.ADMIN_ID);
    // find the SuperAdmin document with the specified ID and populate the "messages" array with Message data
    const admin = await Admin.findById(req.body.ADMIN_ID).populate(
      "payments",
      "subject email message"
    );

    // extract the relevant data from the populated "payments" array
    const messagesData = admin.messages.map((message) => {
      return {
        message: message.message,
        email: message.email,
        subject: message.subject,
      };
    });

    // send the extracted data as a response to the frontend
    console.log(messagesData);
    res.json(messagesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal sdsdserver error" });
  }
};

const getOrders = async (req, res) => {
 
  try {
    
    const ordersArray = [];

    const template = await Template.findById(req.params.templateId)

  
      if (template &&  template?.data?.orders) {
        const orders = template.data.orders;

        for (const orderId of orders) {
          const order = await Order.findById(orderId);
          if (order) {
            console.log("order",order)
            const orderDetails = {
              products:order.products,
              totalprice: order.totalprice,
              paymentmethod: order.paymentmethod,
              address: order.address,
            };
            ordersArray.push(orderDetails);
          }
        }
      }
    
    console.log(ordersArray);

    res.status(200).json({orders:ordersArray});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAppointmentsOnAdminDashboard = async (req, res) => {
  try {
    const admin = await Admin.findById(req.body.ADMIN_ID).populate(
      "savedTemplates"
    );
    const appointmentsArray = [];

    for (const template of admin.savedTemplates) {
      if (template && template.data && template.data.appointments) {
        const appointments = template.data.appointments;

        for (const appointmentId of appointments) {
          const appointment = await Order.findById(appointmentId);
          if (appointment) {
            const appointmentDetails = {
              customername: appointment.customername,
              doctorname: appointment.doctorname,
              time: appointment.time,
            };
            appointmentsArray.push(appointmentDetails);
          }
        }
      }
    }
    console.log(appointmentsArray);

    res.status(200).json(appointmentsArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getJobApplicationsOnAdminDashboard = async (req, res) => {
  try {
    const admin = await Admin.findById(req.body.ADMIN_ID).populate(
      "savedTemplates"
    );
    const jobApplicationsArray = [];

    for (const template of admin.savedTemplates) {
      if (template && template.data && template.data.jobApplications) {
        const jobApplications = template.data.jobApplications;

        for (const jobApplicationId of jobApplications) {
          const jobApplication = await Order.findById(jobApplicationId);
          if (jobApplication) {
            const jobApplicationDetails = {
              name: jobApplication.name,
              designation: jobApplication.designation,
              application: jobApplication.application,
            };
            jobApplicationsArray.push(jobApplicationDetails);
          }
        }
      }
    }
    console.log(jobApplicationsArray);

    res.status(200).json(jobApplicationsArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const addInMessageSentToAdmin = async (req, res) => {
  // this will add message that is sent to admin in the message collection

  const { email, subject, message, templateId } = req.body;

  const saveMessage = Message({
    _id: mongoose.Types.ObjectId(),
    email,
    subject,
    message,
  });
  try {
    let newMessage = await saveMessage.save();
    let response = await addMessageIdinAdmin(newMessage._id, templateId);
    return res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
};

const addMessageIdinAdmin = async (messageID, templateId) => {
  try {
    // add message id template
    const template = await Template.findById(templateId);
    template.messages.push(messageID);

    // Save the updated  template document
    await template.save();

    console.log(template);
    return template;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const getMessages = async (req, res) => {
  console.log("templateID", req.params.templateId);
  try {
    const template = await Template.findById(req.params.templateId).populate(
      "messages"
    );
    if (template) {
      console.log("template", template);
      res.status(200).json({ messages: template.messages });
    } else {
      res.status(400).json({ messages: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
const checksubdomainavailability = async (req, res) => {
  try {

    const subdomain = req.body.subdomain
    const query = { subdomain: subdomain };
    const matchingDocuments = await PublishedWebsites.find(query).lean();

    // Send response based on the result
    if (matchingDocuments.length > 0) {
      res.json({ exists: false });
    } else {
      res.json({ exists: true });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addInPublishedWebsites = async(req, res) => {
  const subdomain = req.body.subdomain;
  const templateid = req.body.templateid;
  const type = req.body.type;
  const name = req.body.name;


  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  try {
    console.log(templateid + " this is templateid")


    const document = new PublishedWebsites ({
      _id: mongoose.Types.ObjectId(),
name:name,
      subdomain: subdomain,
      templateid: templateid,
      type: type,
      Date: formattedDate
    });

    const savedPublishedWebsites = await document.save();
    console.log(savedPublishedWebsites);
    res.status(201).json(savedPublishedWebsites);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error adding published web. Please try again later." });
  }

};

const addPublishIDinAdmin = async (req,res) => {
  try {
    // Find the admin document by ID
    const {publishID, adminID} = req.body;
    const admin = await Admin.findById(adminID);
    
    
    // Push the publishID to the publishedwebsites array
    admin.publishedwebsites.push(publishID);

    // Save the updated admin document
    await admin.save();

    console.log(admin);
    return admin;
  } catch (err) {
    console.log(err);
    return err;
  }
};


module.exports = {
  registeredAdmins,
  getEmailAndUsernameOfAdmins,

  addMessageIdinAdmin,
  buyPlan,
  stripePayment,
  addPaymentIdinAdmin,
  addInMessageSentToSuperAdmin,
  addMessageIdinSuperAdmin,
  addpaymentidinsuperadmin,
  getTotalPaymentsAndMessages,
  getAdminData,
  updateActivePlan,
  getMessagesOnAdminDashboard,
  getPaymentsOnAdminDashboard,
  getOrders,
  getAppointmentsOnAdminDashboard,
  getJobApplicationsOnAdminDashboard,

  ///added now

  getMessages,
  addInMessageSentToAdmin,
  addInPublishedWebsites,
  

  //added by fahad now
  checksubdomainavailability,
  addInPublishedWebsites,
  addPublishIDinAdmin
  
};
