const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
    {
        empId: {
            type: String,
            required: true,
            unique: true
        },
        siteId: {
            type: String,
            required: true,
            unique: true
        },
        siteName: {
            type: String,
        },
        empName: {
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

const EmployeeData = mongoose.model("EmployeeData", employeeSchema);

module.exports.EmployeeData = EmployeeData;

module.exports = {
    EmployeeData,
};