import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    prenom: { type: String, required: true },
    niveau: { type: String }, // exemple : "CP", "CE1"
    categorie: { type: String }, // exemple : "Addition", "Soustraction"
    correctAnswers: { type: Number, default: 0 },
    incorrectAnswers: { type: Number, default: 0 },
    duration: { type: Number, default: 0 }, // en secondes
    feedback: { type: String },
    expression: { type: String }, // ex: happy, sad...
  },
  { timestamps: true }
);

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
