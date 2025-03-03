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
            applicationCount: true,
          },
        },
      },
    });

    if (!applications || applications.length === 0) {
      return NextResponse.json(
        { success: false, message: "No referrals found" },
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

export async function POST(req, { params }) {
  try {
    let { userId } = await params;
    userId = Number(userId);
    console.log(userId);
    const { referralId } = await req.json();
    console.log(referralId);
    if (!userId || !referralId) {
      return NextResponse.json(
        { error: "User ID and Referral ID are required." },
        { status: 400 }
      );
    }

    // Check if the application already exists
    const existingApplication = await client.application.findUnique({
      where: {
        userId_referralId: {
          userId,
          referralId,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job." },
        { status: 400 }
      );
    }

    // Create a new application
    const newApplication = await client.application.create({
      data: {
        userId,
        referralId,
      },
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully!",
        application: newApplication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
