import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 20,    
    },

    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 20,    
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default : "", 
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    friends: {
        type: Array,
        default : [], 
    },
    location: String,
    occupation: String,
    /*viewedProfile: Number,
    impressions: Number,*/
},
    { timestamps: true }
);
   
const User = mongoose.model("User", UserSchema);
export default User;