const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _user: {
      type: mongoose.ObjectId,
      required: true,
    },
    breeds: {
      type: Array,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    create_on: {
      type: Date,
      default: new Date
    },
    tipe: {
      type: String,
      default: 'manual'
    }
});

module.exports = mongoose.model('Card', schema, 'cards');