const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    pass: {
      type: String,
      required: true,
      select: false
    },
    type: {
      type: Number,
      default: 5
    }
});

UserSchema.pre('save', async function(next){
  const mh4sh = await bcrypt.hash(this.pass, 10)
  this.pass = mh4sh;

  next();
});

module.exports = mongoose.model('Users', UserSchema, 'users');