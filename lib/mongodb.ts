import mongoose from "mongoose";

export async function connectToDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not defined.");
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB déjà connectée");
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "qtrobot",
    });
    console.log("✅ Connexion à MongoDB réussie");
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB:", err);
  }
}

