import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, age, class_name } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    const ageNum = Number(age);
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 149) {
      return NextResponse.json(
        { error: "Age must be a number between 1 and 149" },
        { status: 400 }
      );
    }
    if (!class_name || typeof class_name !== "string" || !class_name.trim()) {
      return NextResponse.json(
        { error: "Class is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.from("students").insert({
      name: name.trim(),
      age: ageNum,
      class_name: class_name.trim(),
    }).select("id").single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to save" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
