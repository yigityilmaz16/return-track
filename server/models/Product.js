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
  },
  owner:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'User',
  required:true,
  index: true
},
}, {
  timestamps: true, // Automatically generates 'createdAt' and 'updatedAt' fields
  toJSON:{
    virtuals:true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
        delete ret.owner
        }
  }
});




const Product= mongoose.model('Product',productSchema)
export default Product