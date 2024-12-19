import { NextResponse } from "next/server";
import client from "../../../../../../connection/prisma";

export async function PUT(req, { params }) {
  const {Id} = await params;
  const body = await req.json();
  
  console.log("User ID:", Id);
  console.log("Body:", body);

  try {
    const updatedCandidate = await client.candidate.update({
      where: { 
        user_id: parseInt(Id),
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
      { success: false, message: `Error updating education with ID ${Id}.` },
      { status: 500 }
    );
  }
}
