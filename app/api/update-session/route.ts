// app/api/update-session/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Session from "@/models/Session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prenom, niveau, expression, duration } = body;

    await connectToDB();

    await Session.updateOne(
      { prenom, niveau },
      {
        $set: {
          expression,
          duration,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur dans update-session:", err);
    return NextResponse.json({ success: false, error: err });
  }
}
