const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
    {
        siteId: {
          type: String,
          required: true,
          unique: true
        },
        siteName: {
          type: String,
        },
        totalEmployee: {
          type: String,
        },
        ratePerEmployee: {
          type: String
        },
        gstPercentage: {
          type: String
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