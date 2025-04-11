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
    console.log("Reçu par API:", body); 
    await connectToDB();

    const { prenom, niveau, activity }: { prenom: string; niveau: string; activity: Activity } = body;

    // Cherche une session existante
    let session = await Session.findOne({ prenom, niveau });


    if (!session) {
      // Crée une session si elle n'existe pas
      session = await Session.create({
        prenom,
        niveau,
        expression: "",
        duration: 0,
        activities: [activity],
      });
    } else {
      // Vérifie si une activité similaire existe déjà (même catégorie + difficulté)
      const existingActivity = session.activities.find((act: Activity) =>
        act.categorie === activity.categorie && act.difficulte === activity.difficulte
      );

      if (existingActivity) {
        // ➕ Incrémente les scores existants
        existingActivity.correctAnswers += activity.correctAnswers;
        existingActivity.incorrectAnswers += activity.incorrectAnswers;
      } else {
        // ➕ Ajoute une nouvelle activité sinon
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
