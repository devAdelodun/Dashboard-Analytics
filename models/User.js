import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        min: 2,
        max: 100
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: [true, "Email already taken"],
        max: 50
    },
    password:{
        type: String,
        required: true,
        max: 50,
    },
    city:{
        type: String,
        required: true,
        max: 50,
    },
    occupation:{
        type: String,
        required: true,
        max: 50,
    },
    phoneNumber:{
        type: String,
        required: true,
        max: 50,
    },
    transaction:{
        type: Array,
        required: true,
        max: 50,
    },
    role:{
        type: String,
        enum:["user", "admin", "superadmin"],
        default: "admin",
    },

 }, {timestamps: true}

)

const User = mongoose.model("User", UserSchema)

export default User;
