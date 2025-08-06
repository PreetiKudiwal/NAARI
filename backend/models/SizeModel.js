const mongoose = require('mongoose');

const SizeSchema = mongoose.Schema({
  sizeLabel: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: true
  },
  sizeSlug: {
    type: String,
    enum: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    required: true
  },
  bust: {
    type: Number,
    required: true,
    min: 28,
    max: 50 // Adjust as needed
  },
  waist: {
    type: Number,
    required: true,
    min: 24,
    max: 48 // Adjust as needed
  },
  hip: {
    type: Number,
    required: true,
    min: 30,
    max: 52 // Adjust as needed
  },
  indiaSize: {
    type: Number,
    enum: [32, 34, 36, 38, 40, 42, 44],
    required: true
  },
  intlSize: {
    type: String,
    enum: ['0-2', '4-6', '8-10', '12-14', '16-18', '20-22'],
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
},
  {
    timestamps: true
  }
);
const SizeModel = mongoose.model("sizes", SizeSchema);

module.exports = SizeModel;