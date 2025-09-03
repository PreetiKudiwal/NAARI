const mongoose = require('mongoose');

const SizeSchema = mongoose.Schema({
  sizeLabel: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'OneSize'],
    required: true
  },
  sizeSlug: {
    type: String,
    required: true
  },
  bust: {
    type: Number,
    min: 28,
    max: 50, 
    required: function () {
      return this.sizeLabel !== 'OneSize';
    }
  },
  waist: {
    type: Number,
    min: 24,
    max: 48,
    required: function () {
      return this.sizeLabel !== 'OneSize';
    } 
  },
  hip: {
    type: Number,
    min: 30,
    max: 52,
    required: function () {
      return this.sizeLabel !== 'OneSize';
    }
  },
  indiaSize: {
    type: Number,
    enum: [32, 34, 36, 38, 40, 42, 44],
    required: function () {
      return this.sizeLabel !== 'OneSize';
    }
  },
  intlSize: {
    type: String,
    enum: ['0-2', '4-6', '8-10', '12-14', '16-18', '20-22'],
    required: function () {
      return this.sizeLabel !== 'OneSize';
    }
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