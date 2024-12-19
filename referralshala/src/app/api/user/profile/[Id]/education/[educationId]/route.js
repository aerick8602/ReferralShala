import { NextResponse } from "next/server";
import client from "../../../../../../../connection/prisma";

export async function PUT(req, { params }) {
  const { Id, educationId } = await params;
  const body = await req.json();
  
  console.log("User ID:", Id);
  console.log("Education ID:", educationId);
  console.log("Body:", body);

  try {
    const updatedEducation = await client.education.update({
      where: { 
        id: parseInt(educationId), 
        userId: parseInt(Id),
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
      { success: false, message: `Error updating education with ID ${educationId}.` },
      { status: 500 }
    );
  }
}
