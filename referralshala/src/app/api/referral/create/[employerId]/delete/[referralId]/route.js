import { NextResponse } from "next/server";
import client from "../../../../../../../connection/prisma";



export async function PATCH(req, { params }) {
    const { employerId } =await params;
    let { referralId } =await params;
    referralId=Number(referralId);
    const userId = Number(employerId);
    const data = await req.json();
  
    const { companyName, jobCategory, jobTitle, jobDescription, jobLink, location, experienceRequired } = data;
  
    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is missing." }, { status: 400 });
    }
  
    if (!referralId) {
      return NextResponse.json({ success: false, message: "Referral ID is required." }, { status: 400 });
    }
  
    // if (
    //   !companyName ||
    //   !jobCategory ||
    //   !jobTitle ||
    //   !jobDescription ||
    //   !jobLink ||
    //   !location ||
    //   experienceRequired === undefined
    // ) {
    //   return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
    // }
  
    try {
      const existingReferral = await client.referral.findUnique({
        where: { referralId },
      });
  
      if (!existingReferral) {
        return NextResponse.json({ success: false, message: "Referral not found." }, { status: 404 });
      }
  
      if (existingReferral.userId !== userId) {
        return NextResponse.json({ success: false, message: "Unauthorized to edit this referral." }, { status: 403 });
      }
  
      const updatedReferral = await client.referral.update({
        where: { referralId },
        data: {
          companyName,
          jobCategory,
          jobTitle,
          jobDescription,
          jobLink,
          location,
          experienceRequired,
          updatedAt: new Date(), // Auto-update timestamp
        },
      });
  
      return NextResponse.json({ success: true, data: updatedReferral }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
  

  export async function DELETE(req, { params }) {
    const { employerId } =await  params;
    
    let { referralId } =await params;
    referralId=Number(referralId);
    const userId = Number(employerId);
  
  
    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is missing." }, { status: 400 });
    }
  
    if (!referralId) {
      return NextResponse.json({ success: false, message: "Referral ID is required." }, { status: 400 });
    }
  
    try {
      const existingReferral = await client.referral.findUnique({
        where: { referralId },
      });
  
      if (!existingReferral) {
        return NextResponse.json({ success: false, message: "Referral not found." }, { status: 404 });
      }
  
    //   if (existingReferral.userId !== userId) {
    //     return NextResponse.json({ success: false, message: "Unauthorized to delete this referral." }, { status: 403 });
    //   }
  
      await client.referral.delete({
        where: { referralId },
      });
  
      return NextResponse.json({ success: true, message: "Referral deleted successfully." }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
  





