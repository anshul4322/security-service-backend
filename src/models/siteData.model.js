const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
  {
    companyId: {
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
      required: true,
      trim: true,
      unique: true
    },
    siteAddress: {
      type: String,
      required: true,
      trim: true
    },
    totalEmployees: {
      type: Number,
      required: true,
      min: 0
    },
    estimatedCostPerMonth: {
      type: Number,
      required: true,
      min: 0
    },
    compliance: {
      type: String,
      required: true,
      enum: ['yes', 'no']
    },
    gstPercentage: {
      type: Number,
      required: true,
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