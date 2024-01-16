import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
 
},{
    timestamps : true  //This option automatically adds two fields, createdAt and updatedAt, to the documents in the collection
})
const Admin = mongoose.model('Admin',adminSchema)

export default Admin