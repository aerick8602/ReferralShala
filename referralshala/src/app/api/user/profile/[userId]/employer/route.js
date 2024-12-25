import { NextResponse } from "next/server";
import client from "../../../../../../connection/prisma";


export async function PATCH(req, { params }) {
  const { userId } =await params;

  try {
    const body = await req.json();
    const { companyName, jobRole, location } = body;

    const updateData = {
      ...(companyName ? { companyName:companyName } : {}),
      ...(jobRole ? { jobRole:jobRole } : {}),
      ...(location ? { location:location } : {}),
    };


    // Validate updateData
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields provided for update." },
        { status: 400 }
      );
    }

    // Perform the update
    const updatedEmployer = await client.employer.update({
      where: { userId: parseInt(userId) }, // Ensure userId is an integer
      data: updateData,
    });


    // Return the updated data
    return NextResponse.json(
      { success: true, data: updatedEmployer },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in PATCH request:", error);

    return NextResponse.json(
      { success: false, message: `Error updating employer: ${error.message}` },
      { status: 500 }
    );
  }
}





export async function GET(req, { params }) {
  const { userId } = await params;
  // console.log("userId:", userId);

  if (!userId ) {
      return NextResponse.json(
          { success: false, message: "Invalid userId provided." },
          { status: 400 }
      );
  }
  
  try {
    const profile = await client.employer.findUnique({
      where: { userId: parseInt(userId) },
      
    });
    if (!profile) {
      return NextResponse.json(
        { success: false, message: `candidate with userId ${userId} not found.` },
        { status: 404 }
      );
    }
  
    return NextResponse.json(
      { success: true, data: profile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error fetching candidate with userId ${userId}.` },
      { status: 500 }
    );
  }
}
