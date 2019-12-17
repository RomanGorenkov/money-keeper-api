import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email:  {
    type: String,
    required: true,
  },
  password:  {
    type: String,
    required: true,
  },
});
