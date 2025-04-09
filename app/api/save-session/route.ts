import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Session from "@/models/Session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDB();
    await Session.create(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur Mongo:", err);
    return NextResponse.json({ success: false, error: err });
  }
}
