import mongoose from "mongoose";

export async function connectToDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not defined.");
    return;
  }

  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(uri, {
    dbName: "qtrobot", // tu peux choisir un autre nom
  });
}
