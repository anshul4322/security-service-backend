const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    siteId: {
      type: String,
      required: true,
      unique: true
    },
    siteName: {
      type: String,
      required: true,
      trim: true,
    },
    siteAddress: {
      type: String,
      trim: true
    },
    totalEmployees: {
      type: Number,
      min: 0
    },
    estimatedCostPerMonth: {
      type: Number,
      min: 0
    },
    compliance: {
      type: String,
      enum: ['yes', 'no']
    },
    gstPercentage: {
      type: Number,
      min: 0,
      max: 100
    },
    contactPerson: {
      type: String,
      trim: true
    },
    contactPersonNo: {
      type: String,
      validate(value) {
        if (!value.match(/\d{10}/)) {
          throw new Error(
            "Phone Number is not valid"
          );
        }
      },
    },
    referral: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean
    }
  },
  {
    timestamps: true,
    
  }
);

siteSchema.statics.isSiteRegistered = async function (siteName, companyId) {
  const site = await this.findOne({ siteName, companyId });
  return !!site;
};

siteSchema.pre("save", async function (next) {
  const user = this;
  next();
});

const SiteData = mongoose.model("SiteData", siteSchema);

module.exports.SiteData = SiteData;

module.exports = {
    SiteData,
};