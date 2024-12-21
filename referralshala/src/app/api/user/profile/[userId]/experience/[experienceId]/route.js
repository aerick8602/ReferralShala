import { NextResponse } from "next/server";
import client from "../../../../../../../connection/prisma";

export async function PUT(req, { params }) {
  const { userId, experienceId } = await params;
  const body = await req.json();
  
  console.log("userId:", userId);
  console.log("Experience userId:", experienceId);
  console.log("Body:", body);

  try {
    const updatedEdexperience = await client.experience.update({
      where: { 
        userId: parseInt(experienceId), 
        userId: parseInt(userId),
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
      { success: false, message: `Error updating experience with userId ${experienceId}.` },
      { status: 500 }
    );
  }
}
