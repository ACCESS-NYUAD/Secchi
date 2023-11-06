const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    deepDepth: {
      type: Number,
      required: true,
    },
    shallowDepth: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    satellite_num: {
      type: Number,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    submitted_at: {
      type: Date,
      required: true,
    },
    received_at: {
      type: Date,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const dataModel = mongoose.model("measurements", dataSchema);

module.exports = dataModel;
