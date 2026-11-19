import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema =new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6,
},


contact:String,
role:{type:String,
    enum:["user","admin"],
    default:"user"},

status: {
    type: String,
    enum: ["active", "block"],
    default: "active"
}

},{timestamps:true})


//// hash password

userSchema.pre("save",async function(){
if(!this.isModified("password"))
    return;

 this.password=await bcrypt.hash(this.password,12)
})


////// compare password

userSchema.methods.comparePswd=async function(enteredPassword){
return bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model("User",userSchema);

export default User;