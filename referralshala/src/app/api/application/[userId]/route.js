import { NextResponse } from "next/server";
import client from "../../../../connection/prisma";



  export async function GET(req, { params }) {
    let { userId } = await params;
    userId = Number(userId);
    console.log(userId);
  
    try {
      const applications = await client.application.findMany({
        where: { userId },
        select: {
          referral: {
            select: {
              referralId: true,
              companyName: true,
              jobTitle: true,
              jobCategory: true,
              jobDescription: true,
              jobLink: true,
              location: true,
              experienceRequired: true,
              postedAt: true,
              applicationCount:true,
            },
          },

        },
      });
  
      if (!applications || applications.length === 0) {
        return NextResponse.json(
          { success: false, message: `No referrals found` },
          { status: 404 }
        );
      }
  
      console.log(applications);
  
      return NextResponse.json(
        { success: true, data: applications },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }
  