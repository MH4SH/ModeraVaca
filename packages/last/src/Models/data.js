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

});


module.exports = mongoose.model('Datas', schema);