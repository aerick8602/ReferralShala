import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";

export async function PATCH(req, { params }) {
  try {
    console.log("Incoming request to update referral:", params);

    const { referralId } = await params;
    const referralUpdates = await req.json();

    console.log("Parsed referralId:", referralId);
    console.log("Received referral updates:", referralUpdates);

    if (!referralId) {
      console.error("Error: Referral ID is missing.");
      return NextResponse.json(
        { success: false, message: "Referral ID is required." },
        { status: 400 }
      );
    }

    if (!referralUpdates || Object.keys(referralUpdates).length === 0) {
      console.error("Error: Referral updates are empty.");
      return NextResponse.json(
        {
          success: false,
          message: "At least one field is required to update.",
        },
        { status: 400 }
      );
    }
    const updatedReferral = await client.referral.update({
      where: { referralId: Number(referralId) },
      data: {
        companyName: referralUpdates.companyName || undefined,
        jobCategory: referralUpdates.jobCategory || undefined,
        jobTitle: referralUpdates.jobTitle || undefined,
        jobDescription: referralUpdates.jobDescription || null,
        jobLink: referralUpdates.jobLink || null,
        location: referralUpdates.location || undefined,
        experienceRequired:
          referralUpdates.experienceRequired !== undefined
            ? referralUpdates.experienceRequired
            : null,
      },
    });

    console.log("Referral updated successfully:", updatedReferral);

    return NextResponse.json(
      {
        success: true,
        message: "Referral updated successfully.",
        data: updatedReferral,
      },
      { status: 200 }
    );
  } catch {
    console.log("Error updating referral");

    return NextResponse.json(
      {
        success: false,
        message: "Error updating referral.",
      },
      { status: 500 }
    );
  }
}
