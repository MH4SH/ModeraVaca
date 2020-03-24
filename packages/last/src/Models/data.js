const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    kind: {
        type: String,
        required: true,
        enum: ['salesman', 'breed', 'buyer']
      },
    number: {
        type: Number,
        required: true
      },
    value: {
        type: String,
        required: true
      },
    status: {
        type: Boolean,
        default: true,
        trim: true
      },

});


module.exports = mongoose.model('Datas', schema);