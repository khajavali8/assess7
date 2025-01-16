import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  oldPassword: {
    type: String,

  },
  newPassword: {
    type: String,
  
  },
}, {
  timestamps: true
});


userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


export default mongoose.model('harsha1', userSchema);