const mongoose = require('mongoose');
const ProfileSchema = mongoose.Schema({
  users: {
    type: Object
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'processing'
  },
  mobile: {
    type: Number,
  },
  age: {
    type: Number,
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  },
  country: {
    type: String,
  },
  pictures: {
    type: Array,
    required: true
  }
}, { minimize: false });

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;