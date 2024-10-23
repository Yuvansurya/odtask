const mongoose = require('mongoose');

// Define the schema for each time slot
const timeSlotSchema = new mongoose.Schema({
  fromHours: Number,
  fromMinutes: Number,
  fromPeriod: String,
  toHours: Number,
  toMinutes: Number,
  toPeriod: String
});

// Define the main schema that contains an array of time slots
const scheduleSchema = new mongoose.Schema({
  slots: [timeSlotSchema], // Array of `timeSlotSchema` objects
  reason: {
    type: String,
    required: true,
  },
  user_data: { // Add user_data field
    name: String,
    rollno: String,
    year: String,
    dept: String,
  },
  expireAt: { // TTL field
    type: Date,
    required: true,
    default: getToday12PM // Set the default value to today's 12 PM
  }
});

// Create a TTL index on `expireAt`
scheduleSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Create the Schedule model
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

// Function to get today's 12 PM
function getToday12PM() {
  const today12PM = new Date();
  today12PM.setHours(12, 0, 0, 0); // Set time to 12:00:00 PM today

  return today12PM;
}
