import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: String,
  email: { type: String, required: true, unique: true },
  callInterval: String,
  linkedin: String,
  github: String,
  comment: { type: String, required: true },
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export default Candidate;
