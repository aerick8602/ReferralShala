import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";


export async function GET(req,{params}) {

  const {employerId}=await params;
  const userId=Number(employerId);
  console.log(userId);

  try {
    const referrals = await client.referral.findMany({
      where:{userId}
    });

    if (!referrals) {
      return NextResponse.json(
        { success: false, message: ` no referrals` },
        { status: 404 }
      );
    }

    // const data = formatUserData(referrals);
    console.log(referrals);

    return NextResponse.json(
      { success: true, data: referrals },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  } 
}



export async function POST(req, { params }) {
  const { employerId } = await params; 
  const userId=Number(employerId);
  const data = await req.json();

  const { companyName, jobCategory, jobTitle, jobDescription, jobLink, location, experienceRequired } = data;
  // console.log(userId,companyName, jobCategory, jobTitle, jobDescription, jobLink, location, experienceRequired)
  

if (
  !userId ||
  !companyName ||
  !jobCategory ||
  !jobTitle ||
  !jobDescription ||
  !jobLink ||
  !location ||
  experienceRequired === undefined
) {

  return NextResponse.json(
    { success: false, message: "Missing required fields." },
    { status: 400 }
  );
}


  try {
    const referral = await client.referral.create({
      data: {
    userId,
    companyName,
    jobCategory,
    jobTitle,
    jobDescription,
    jobLink,
    location,
    experienceRequired
    },
    });
    return NextResponse.json(
      { success: true, data: referral },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



