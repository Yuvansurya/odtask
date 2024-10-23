const mongoose = require('mongoose');

// Define the Slot schema
const slotSchema = new mongoose.Schema({
  fromHours: {
    type: Number,
    required: true,
  },
  fromMinutes: {
    type: Number,
    required: true,
  },
  fromPeriod: {
    type: String,
    required: true,
  },
  toHours: {
    type: Number,
    required: true,
  },
  toMinutes: {
    type: Number,
    required: true,
  },
  toPeriod: {
    type: String,
    required: true,
  },
});

// Create the Slot model
const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
