import { NextResponse } from "next/server";
import client from "../../../../../../../connection/prisma";

export async function PUT(req, { params }) {
  const { Id, experienceId } = await params;
  const body = await req.json();
  
  console.log("User ID:", Id);
  console.log("Experience ID:", experienceId);
  console.log("Body:", body);

  try {
    const updatedEdexperience = await client.experience.update({
      where: { 
        id: parseInt(experienceId), 
        userId: parseInt(Id),
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(
      { success: true, data: updatedEdexperience },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error updating experience with ID ${experienceId}.` },
      { status: 500 }
    );
  }
}
