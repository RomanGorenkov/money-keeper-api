import * as mongoose from 'mongoose';

export const CostCategorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  categoryName:  {
    type: String,
    required: true,
  },
  categoryColor: {
    type: String,
    required: false,
  },
  categoryUrl: {
    type: String,
    required: true,
  },
});
