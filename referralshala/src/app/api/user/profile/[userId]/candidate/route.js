import { NextResponse } from "next/server";
import client from "../../../../../../connection/prisma";

export async function PUT(req, { params }) {
  const {userId} = await params;
  const body = await req.json();
  
  console.log("userId:", userId);
  console.log("Body:", body);

  try {
    const updatedCandidate = await client.candidate.update({
      where: { 
        user_id: parseInt(userId),
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(
      { success: true, data: updatedCandidate },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error updating education with userId ${userId}.` },
      { status: 500 }
    );
  }
}
