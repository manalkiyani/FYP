const express = require("express");
const {
  addDoctor,
  getAllDoctors,
  delDoctor,
  editDoctor,
  changeIsBookedStatus,
  addSlots,
  addSlotsIDinDoctor,
  getSlots,
  bookAppointment,
  AppointmentsIDtoTemplate,
  getAppointmentsToViewer,
  getAppointmentstoAdmin,
  doctorCompletesAppointment,
  DoctorIDtoTemplate,
  delDoctorIdFromTemplate,
  getListOfDoctors,
  getDoctor,
} = require("../controllers/doctor.controller");

const router = express.Router();

router.post("/adddoctor", addDoctor);
router.get("/getalldoctors", getAllDoctors);
router.delete("/deldoctor/:Id", delDoctor);
router.put("/editdoctor/:Id", editDoctor);
router.post("/get", getListOfDoctors);
router.get("/getOne/:doctorId", getDoctor);
// router.put("/bookappointment", bookAppointment)
router.post("/addslots", addSlots);
router.put("/addslotsidindoctor", addSlotsIDinDoctor);
router.get("/getslots/:doctorId/:dayOfWeek", getSlots);
router.patch("/changeisbookedstatus/:slotId", changeIsBookedStatus);
router.post("/bookappointment", bookAppointment);
router.put("/appointmentidtotemplate", AppointmentsIDtoTemplate);
router.put("/appointmentidtotemplate", AppointmentsIDtoTemplate);
router.post("/getappointmentstoviewer", getAppointmentsToViewer);
router.post("/getappointmentstoadmin", getAppointmentstoAdmin);
router.put("/doctorcompletesappointment", doctorCompletesAppointment);
router.put("/doctoridtotemplate", DoctorIDtoTemplate);
router.put("/deldoctoridfromtemplate", delDoctorIdFromTemplate);

module.exports = router;
