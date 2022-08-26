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
    phone: {
        type: Number,
        require:true
    },
    afm: {
        type: Number,
        require:true
    },
    address: {
        type: String,
        require:false
    },
    isAdmin: {
        type: Boolean,
        require:true,
        default:false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
{
    timestamps:true
}
)

const User = mongoose.model("User", userSchema);

export default User;