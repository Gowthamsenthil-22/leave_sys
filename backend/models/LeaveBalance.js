const mongoose = require('mongoose');

const leaveBalanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    casual: {
      type: Number,
      default: 12,
    },
    sick: {
      type: Number,
      default: 10,
    },
    earned: {
      type: Number,
      default: 15,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeaveBalance', leaveBalanceSchema);
