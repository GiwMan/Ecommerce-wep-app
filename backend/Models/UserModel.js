import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require:true 
    },
    email: {
        type: String,
        require:true,
        unique:true
    },
    password: {
        type: String,
        require:true
    },
    isAdmin: {
        type: Boolean,
        require:true,
        default:false
    },
    role: { 
        type: String, 
        emum: ["user","admin"] , 
        required: true 
    }
},
{
    timestamps:true
}
)

const User = mongoose.model("User", userSchema);

export default User;