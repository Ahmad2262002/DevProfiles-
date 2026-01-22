import mongoose, { Schema, models, model } from "mongoose";
const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        required: true,
        trim: true,
    },
    // skills: {
    //     type: [String],
    //     default: [],
    // },
    // YearsOfExperience: {
    //     type: Number,
    //     default: 0,
    //     min: 0,
    // },

}, { timestamps: true });
export default models.Developer || model("Developer", DeveloperSchema);