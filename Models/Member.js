const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      },
      message: props => `${props.value} "Please fill a valid email address!"`
    },
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  superUser: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);