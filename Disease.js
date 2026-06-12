import mongoose from "mongoose";

const DiseaseSchema = new mongoose.Schema({
  disease: String,
  symptoms: [String],
  precautions: [String]
});

export default mongoose.model("Disease", DiseaseSchema,"diseases");
