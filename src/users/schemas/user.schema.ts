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
  language: {
    type: String,
    required: false,
  },
  currencyName: {
    type: String,
    required: false,
  },
});
