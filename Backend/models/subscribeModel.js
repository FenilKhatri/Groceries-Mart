import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },

        subscribedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

export default Subscribe;