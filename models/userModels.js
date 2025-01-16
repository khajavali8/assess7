import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
   
    unique: true
  },
  password: {
    type: String,
    
  },
  age: {
    type: Number
    
  },
  oldpassword:{
    type: String,
  },
  oldpassword:{
    type: String,
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


export default mongoose.model('User', userSchema);
