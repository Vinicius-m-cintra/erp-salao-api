const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre('save', async function encrypt(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model('User', schema, 'users');
