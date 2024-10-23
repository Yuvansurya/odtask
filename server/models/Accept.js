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
const acceptSchema = new mongoose.Schema({
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
  status: { // Add status field
    type: Number,
    required: true,
    default: 0, // Default status to 0 (pending or declined)
  },
  expireAt: { // TTL field
    type: Date,
    required: true,
    default: getToday12AM // Set the default value to today's or next day's 12 AM
  }
});

// Create a TTL index on `expireAt`
acceptSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Create the Accept model
const Accept = mongoose.model('Accept', acceptSchema);

module.exports = Accept;

// Function to get today's 12 AM or next day's 12 AM based on the current time
function getToday12AM() {
  const today12AM = new Date();
  today12AM.setHours(0, 0, 0, 0); // Set time to 12:00 AM (midnight) today

  const now = new Date();

  // If the current time is after 12 AM, set the expiration to 12 AM tomorrow
  if (now > today12AM) {
    today12AM.setDate(today12AM.getDate() + 1); // Move to the next day
  }

  return today12AM;
}
