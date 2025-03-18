import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";

export async function POST(req, { params }) {
  try {
    console.log("Incoming request to create referral:", params);

    const { userId } = params; // Directly use params.userId
    const referralData = await req.json();

    console.log("Parsed userId:", userId);
    console.log("Received referral data:", referralData);

    if (!userId) {
      console.error("Error: User ID is missing.");
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    if (!referralData || Object.keys(referralData).length === 0) {
      console.error("Error: Referral data is empty.");
      return NextResponse.json(
        { success: false, message: "Referral data is required." },
        { status: 400 }
      );
    }

    // Ensure all required fields are present
    const newReferral = await client.referral.create({
      data: {
        userId: Number(userId), // Ensure userId is a number
        companyName: referralData.companyName || "", // Default to empty string if missing
        jobCategory: referralData.jobCategory || "",
        jobTitle: referralData.jobTitle || "",
        jobDescription: referralData.jobDescription || null,
        jobLink: referralData.jobLink || null,
        location: referralData.location || "",
        experienceRequired:
          referralData.experienceRequired !== undefined
            ? referralData.experienceRequired
            : null, // Handle optional int field
        applicationCount: 0, // Default to 0
      },
    });

    console.log("Referral created successfully:", newReferral);

    return NextResponse.json(
      {
        success: true,
        message: "Referral created successfully.",
        data: newReferral,
      },
      { status: 201 }
    );
  } catch {
    console.log("Error creating referral");

    return NextResponse.json(
      {
        success: false,
        message: "Error creating referral.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
