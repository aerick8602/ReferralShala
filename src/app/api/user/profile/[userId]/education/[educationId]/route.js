import { NextResponse } from "next/server";
import client from "../../../../../../../connection/prisma";



export async function PATCH(req, { params }) {
  const { userId,educationId } = await params;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Invalid userId provided." },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { instituteName, degree, stream, startYear, endYear, isCurrentlyEducating, grade } = body;

  const updateData = {
    ...(instituteName !== undefined && { instituteName }),
    ...(degree !== undefined && { degree }),
    ...(stream !== undefined && { stream }),
    ...(startYear !== undefined && { startYear }),
    ...(endYear !== undefined && { endYear }),
    ...(isCurrentlyEducating !== undefined && { isCurrentlyEducating }),
    ...(grade !== undefined && { grade }),
  };

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { success: false, message: "No fields provided for update." },
      { status: 400 }
    );
  }

  try {
    const updatedEducation = await client.education.updateMany({
      where: { educationId: parseInt(educationId) },
      data: updateData,
    });

    if (!updatedEducation.count) {
      return NextResponse.json(
        { success: false, message: `No education record found for userId ${userId}.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Education record updated successfully.", data: updatedEducation },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating education record:", error);
    return NextResponse.json(
      { success: false, message: `Error updating education record for userId ${userId}.` },
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
    return NextResponse.json(
      { success: false, message: `Error deleting profile with userId ${userId}.` },
      { status: 500 }
    );
  }
}
