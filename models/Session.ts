import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  categorie: String,
  difficulte: String,
  correctAnswers: Number,
  incorrectAnswers: Number,
});

const SessionSchema = new mongoose.Schema(
  {
    prenom: String,
    age: Number, 
    niveau: String,
    expression: String,
    duration: Number,
    activities: [ActivitySchema],
  },
  { timestamps: true }
);

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
