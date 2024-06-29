"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.candidateSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({
        "string.empty": "First name is required",
        "any.required": "First name is required",
    }),
    lastName: joi_1.default.string().required().messages({
        "string.empty": "Last name is required",
        "any.required": "Last name is required",
    }),
    phoneNumber: joi_1.default.string().allow("").optional().messages({
        "string.empty": "Phone number cannot be empty",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
    }),
    callInterval: joi_1.default.string().allow("").optional().messages({
        "string.empty": "Call time cannot be empty",
    }),
    linkedin: joi_1.default.string().uri().allow("").optional().messages({
        "string.uri": "Please provide a valid LinkedIn profile URL",
    }),
    github: joi_1.default.string().uri().allow("").optional().messages({
        "string.uri": "Please provide a valid GitHub profile URL",
    }),
    comment: joi_1.default.string().required().messages({
        "string.empty": "Comment is required",
        "any.required": "Comment is required",
    }),
});
