const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    kind: {
      type: String,
      default: 'purchase'
    },
    salesman: {
      type: mongoose.ObjectId,
      required: true
    },
    breed: {
      type: mongoose.ObjectId,
      required: true
    },
    sexo: {
      type: String,
      required: true,
      enum: ['f', 'm']
    },
    date: {
      type: Date,
      required: true
    },
    birth: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    head_price: {
      type: Number,
      required: true
    },
    freight: {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Transaction', schema);