import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2
   } ,
   email:{
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true
   },
   password:{
    type: String,
    required: true,
    minlength:6,
    select:false
   },
},{
  timestamps: true, // Automatically generates 'createdAt' and 'updatedAt' fields
  toJSON:{
    virtuals:true,
    versionKey:false,
    transform: (doc, ret) => {
        delete ret._id
        delete ret.password
        }
  }
}); 

const User= mongoose.model('User',userSchema)
export default User