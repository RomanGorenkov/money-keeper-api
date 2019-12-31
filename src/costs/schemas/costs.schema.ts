import * as mongoose from 'mongoose';

export const CostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  costType:  {
    type: String,
    required: true,
  },
  costDescription:  {
    type: String,
    required: true,
  },
  costValue:  {
    type: Number,
    required: true,
  },
  costDate: {
    type: Number,
    required: true,
  },
});
