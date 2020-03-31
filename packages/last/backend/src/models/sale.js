const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _user: {
      type: mongoose.ObjectId,
      required: true,
    },
    kind: {
      type: String,
      default: 'sale'
    },
    buyer: {
      type: mongoose.ObjectId,
      required: true
    },
    purchase: {
      type: mongoose.ObjectId,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    cattle: {
      type: Array,
      required: true
    }
});

module.exports = mongoose.model('Sales', schema, 'transactions');