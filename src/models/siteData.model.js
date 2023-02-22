const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
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
        
    },
    {
        timestamps: true,
    }
);

const SiteData = mongoose.model("SiteData", siteSchema);

module.exports.SiteData = SiteData;

module.exports = {
    SiteData,
};