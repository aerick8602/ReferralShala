import { NextResponse } from "next/server";
import client from "../../../connection/prisma";

export async function POST(req) {
  const { userId } = await req.json();
  console.log("Attempting to create candidate with userId:", userId);
  try {
    const newUser = await client.employer.create({
      data: {
        userId,
      },
    });
    console.log("New user created:", newUser);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create candidate." }, { status: 500 });
  }
}
