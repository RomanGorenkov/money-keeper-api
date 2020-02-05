import * as mongoose from 'mongoose';

export const CostCategorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name:  {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
