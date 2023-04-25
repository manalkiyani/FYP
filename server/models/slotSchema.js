const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema({
  day: {
    type: String,
    //required: true
  },
  startTime: {
    type: String,
    //required: true
  },
  endTime: {
    type: String,
    //required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  endDate: {
    type: Date
  }
});

// Define pre middleware to check and update slots every hour
// Define pre middleware to check and update slots every hour
slotSchema.pre('save', function(next) {
  // Calculate endDate based on selected day
  const today = new Date();
  let daysUntilSelectedDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(this.day.toLowerCase()) - today.getDay();

  // Add 7 days to daysUntilSelectedDay if the selected day is earlier than today
  if (daysUntilSelectedDay <= 0) {
    daysUntilSelectedDay += 7;
  }

  const selectedDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilSelectedDay);
  const selectedEndTime = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 1, this.endTime.split(":")[0], this.endTime.split(":")[1]);

  // Set endDate to selectedEndTime
  this.endDate = selectedEndTime;
  

  // Check and update slots every hour
  const checkAndUpdateSlots = async () => {
    try {
      const slots = await this.constructor.find({});
      const currentTime = new Date();
      

      for (const slot of slots) {
        console.log(slot.endDate)
        if (slot.endDate < currentTime) {
          daysUntilSelectedDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(slot.day.toLowerCase()) - today.getDay();

          if (daysUntilSelectedDay <= 0) {
            daysUntilSelectedDay += 7;
          }

          selectedDay.setDate(today.getDate() + daysUntilSelectedDay);
          slot.endDate = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 1, slot.endTime.split(":")[0], slot.endTime.split(":")[1]);
          slot.isBooked = false;

          await slot.save();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  // Execute console.log statements every minute
  setInterval(checkAndUpdateSlots, 60000,() => {
    const currentTime = new Date();
    console.log("Current time is:", currentTime);
  }, 60000);

  next();
});

module.exports = mongoose.model("Slot", slotSchema);