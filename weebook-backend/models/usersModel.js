import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  
    next();
  });
export default model('User', userSchema);