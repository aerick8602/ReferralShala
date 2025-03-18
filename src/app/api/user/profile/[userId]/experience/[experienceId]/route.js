import { NextResponse } from "next/server";
import client from "../../../../../../../connection/prisma";



export async function PATCH(req, { params }) {
  const { userId,experienceId } = await params;

  if (!userId || !experienceId) {
    return NextResponse.json(
      { success: false, message: "Invalid userId provided." },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { companyName,role, location, startYear,endYear,isCurrentlyEmployed,description } = body;

  const updateData = {
    ...(companyName !== undefined && { companyName:companyName }),
    ...(role !== undefined && { role:role }),
    ...(location !== undefined && { location:location }),
    ...(startYear !== undefined && { startYear:startYear }),
    ...(endYear !== undefined && { endYear:endYear }),
    ...(isCurrentlyEmployed !== undefined && { isCurrentlyEmployed:isCurrentlyEmployed }),
    ...(description !== undefined && { description:description }),
  };

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { success: false, message: "No fields provided for update." },
      { status: 400 }
    );
  }

  try {
    const updatedExp = await client.experience.updateMany({
      where: { experienceId: parseInt(experienceId) },
      data: updateData,
    });

    if (!updatedExp.count) {
      return NextResponse.json(
        { success: false, message: `No education record found for userId ${userId}.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Education record updated successfully.", data: updatedExp },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating education record:", error);
    return NextResponse.json(
      { success: false, message: `Error updating education record for userId ${userId}.` },
      { status: 500 }
    );
  }
}





export async function DELETE(req, { params }) {
  const { userId, experienceId } =await params;

  console.log("userId:", userId); 
  console.log("experienceId:", experienceId);        

  if (!userId || !experienceId) {
    return NextResponse.json(
      { success: false, message: "Invalid userId or experienceId provided." },
      { status: 400 }
    );
  }

  try {
    const profile = await client.experience.delete({
      where: { experienceId: parseInt(experienceId) }, 
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, message: `Profile with userId ${userId} and experienceId ${experienceId} not found.` },
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
