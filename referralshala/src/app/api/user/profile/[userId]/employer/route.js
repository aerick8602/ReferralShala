import { NextResponse } from "next/server";
import client from "../../../../../../connection/prisma";

export async function PUT(req, { params }) {
  const {userId} = await params;
  const body = await req.json();
  
  console.log("userId:", userId);
  console.log("Body:", body);

  try {
    const updatedEmployer = await client.employer.update({
      where: { 
        user_id: parseInt(userId),
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(
      { success: true, data: updatedEmployer },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error updating Employer with userId ${userId}.` },
      { status: 500 }
    );
  }
}