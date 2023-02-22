const mongoose = require("mongoose");

const guardSchema = mongoose.Schema(
    {
        name: {
          type: String,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,  
        },
        age: {
            type: Number
        },
        manType: {
            type: String
        },
        currentWorking:{
            type: String
        },
        salary:{
            type: String
        },
        vacant:{
            type:String
        }
    },
    {
        timestamps: true,
    }
);

const GuardData = mongoose.model("GuardData", guardSchema);

module.exports.GuardData = GuardData;

module.exports = {
    GuardData,
};