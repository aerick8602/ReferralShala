import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";

export async function POST(req, { params },err) {
  const { employerId } = await params; 
  const body = await req.json(); 
  console.log("EmployerId :",employerId);
  console.log("Body :",body);

  try {
    const referral = await client.referral.create({
      data: {
        employerId: parseInt(employerId),
        jobTitle: body?.jobTitle, 
        jobDescription: body?.jobDescription, 
        jobLink: body?.jobLink, 
        location: body?.location,
      },
    });
    return NextResponse.json(
      { success: true, data: referral },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create referral." },
      { status: 500 }
    );
  }
}
