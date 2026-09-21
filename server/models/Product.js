import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'] // Custom validation error message
  },
  store: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  returnPeriodDays: {
    type: Number,
    required: true,
    min:1
  },
  isReturned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically generates 'createdAt' and 'updatedAt' fields
});


const Product= mongoose.model('Product',productSchema)
export default Product