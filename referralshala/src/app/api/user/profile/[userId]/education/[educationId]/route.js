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



export async function DELETE(req, { params }) {
  const { userId, educationId } =await params;

  console.log("userId:", userId); 
  console.log("educationId:", educationId);        

  if (!userId || !educationId) {
    return NextResponse.json(
      { success: false, message: "Invalid userId or educationId provided." },
      { status: 400 }
    );
  }

  try {
    const profile = await client.education.delete({
      where: { educationId: parseInt(educationId) }, 
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, message: `Profile with userId ${userId} and educationId ${educationId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting education:", error);  
    return NextResponse.json(
      { success: false, message: `Error deleting profile with userId ${userId}.` },
      { status: 500 }
    );
  }
}
