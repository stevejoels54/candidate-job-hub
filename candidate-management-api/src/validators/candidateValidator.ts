import Joi from "joi";

export const candidateSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  phoneNumber: Joi.string().optional().messages({
    "string.empty": "Phone number cannot be empty",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  callInterval: Joi.string().optional().messages({
    "string.empty": "Call time cannot be empty",
  }),
  linkedin: Joi.string().uri().optional().messages({
    "string.uri": "Please provide a valid LinkedIn profile URL",
  }),
  github: Joi.string().uri().optional().messages({
    "string.uri": "Please provide a valid GitHub profile URL",
  }),
  comment: Joi.string().required().messages({
    "string.empty": "Comment is required",
    "any.required": "Comment is required",
  }),
});
