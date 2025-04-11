import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Session from "@/models/Session";

type Activity = {
  categorie: string;
  difficulte: string;
  correctAnswers: number;
  incorrectAnswers: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Reçu par API:", body);

    await connectToDB();

    const {
      prenom,
      age,
      niveau,
      activity,
    }: { prenom: string; age: number; niveau: string; activity: Activity } = body;

    // Chercher session existante par prénom + niveau
    let session = await Session.findOne({ prenom, niveau });

    if (!session) {
      // Créer une nouvelle session
      session = await Session.create({
        prenom,
        age, // ✅ enregistrement de l'âge
        niveau,
        expression: "",
        duration: 0,
        activities: [activity],
      });
    } else {
      // Cherche activité existante dans la session
      const existingActivity = session.activities.find(
        (act: Activity) =>
          act.categorie === activity.categorie &&
          act.difficulte === activity.difficulte
      );

      if (existingActivity) {
        existingActivity.correctAnswers += activity.correctAnswers;
        existingActivity.incorrectAnswers += activity.incorrectAnswers;
      } else {
        session.activities.push(activity);
      }

      await session.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur Mongo:", err);
    return NextResponse.json({ success: false, error: err });
  }
}
