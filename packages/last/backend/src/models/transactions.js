const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _user: {
      type: mongoose.ObjectId,
      required: true,
    }
});


module.exports = mongoose.model('Transaction', schema, 'transactions');