import { NextResponse } from "next/server";
import client from "../../../../../../../connection/prisma";

export async function PUT(req, { params }) {
  const { userId, educationId } = await params;
  const body = await req.json();
  
  console.log("userId:", userId);
  console.log("Education userId:", educationId);
  console.log("Body:", body);

  try {
    const updatedEducation = await client.education.update({
      where: { 
        userId: parseInt(educationId), 
        userId: parseInt(userId),
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(
      { success: true, data: updatedEducation },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error updating education with userId ${educationId}.` },
      { status: 500 }
    );
  }
}
