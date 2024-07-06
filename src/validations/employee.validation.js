const Joi = require('joi');

const employeeSchema = Joi.object({
  empId: Joi.string().required(),
  siteId: Joi.string().allow(''),
  siteName: Joi.string().allow(''),
  empName: Joi.string().required(),
  gender: Joi.string().valid('male', 'female').allow(''),
  phone: Joi.string().required().trim(),
  address: Joi.string().allow(''),
  birthDate: Joi.date().allow(''),
  designation: Joi.string().allow(''),
  salary: Joi.number().allow(''),
  workingStatus: Joi.string().valid('active', 'inactive').allow(''),
  registrationDate: Joi.date().required(),
  uan: Joi.string().allow(''),
  esic: Joi.string().allow(''),
  policeVer: Joi.boolean().allow(''),
  medicalVer: Joi.boolean().allow(''),
  iCard: Joi.boolean().allow(''),
  aadharNo: Joi.string().allow(''),
  panNo: Joi.string().allow(''),
  photo: Joi.string().allow(''),
  bankAcc: Joi.string().allow(''),
  bankIFSC: Joi.string().allow(''),
  nomineeDetails: Joi.string().allow(''),
  companyForm: Joi.boolean().allow(''),
  registrationFees: Joi.number().allow('')
});

module.exports = {employeeSchema};
