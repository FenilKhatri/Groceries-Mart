import mongoose from "mongoose";
import { schemaOptions } from "./_schemas.js";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
},
    schemaOptions,
);

export default mongoose.model("Contact", contactSchema);