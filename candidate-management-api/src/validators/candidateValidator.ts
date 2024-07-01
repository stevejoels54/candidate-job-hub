import Joi from "joi";

export const candidateSchema = Joi.object({
  firstName: Joi.string()
    .max(25)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.max": "First name cannot be more than 25 characters",
      "string.pattern.base": "First name can only contain letters and spaces",
      "any.required": "First name is required",
    }),
  lastName: Joi.string()
    .max(25)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.max": "Last name cannot be more than 25 characters",
      "string.pattern.base": "Last name can only contain letters and spaces",
      "any.required": "Last name is required",
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .allow("")
    .optional()
    .messages({
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base": "Phone number must be between 7 and 15 digits",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  callInterval: Joi.string().max(50).allow("").optional().messages({
    "string.empty": "Call time cannot be empty",
    "string.max": "Call time cannot be more than 50 characters",
  }),
  linkedin: Joi.string().uri().allow("").optional().messages({
    "string.uri": "Please provide a valid LinkedIn profile URL",
  }),
  github: Joi.string().uri().allow("").optional().messages({
    "string.uri": "Please provide a valid GitHub profile URL",
  }),
  comment: Joi.string().max(500).required().messages({
    "string.empty": "Comment is required",
    "string.max": "Comment cannot be more than 500 characters",
    "any.required": "Comment is required",
  }),
});
