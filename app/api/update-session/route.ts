import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Session from "@/models/Session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Reçu pour update-session:", body);

    await connectToDB();

    const { prenom, age, niveau, expression, duration } = body;

    const session = await Session.findOne({ prenom, niveau });

    if (!session) {
      return NextResponse.json({ success: false, error: "Session introuvable." }, { status: 404 });
    }

    session.expression = expression;
    session.duration = duration;
    // facultatif : tu pourrais stocker l’âge si tu l'as dans le schéma
    if (age) session.age = age;

    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Erreur update-session:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
