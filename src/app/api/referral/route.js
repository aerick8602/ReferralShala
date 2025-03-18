import { NextResponse } from "next/server";
import client from "../../../connection/prisma";

export async function GET() {
  try {
    const referrals = await client.referral.findMany();

    if (!referrals || referrals.length === 0) {
      return NextResponse.json(
        { success: false, message: "No referrals found." },
        { status: 404 }
      );
    }

    console.log("Referrals fetched:", referrals.length);

    return NextResponse.json(
      { success: true, data: referrals },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching referrals:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { referralId } = await req.json();

    if (!referralId) {
      return NextResponse.json(
        { error: "Referral ID is required" },
        { status: 400 }
      );
    }

    // Update application count
    const updatedReferral = await client.referral.update({
      where: { referralId },
      data: { applicationCount: { increment: 1 } }, // Increments the count
    });

    return NextResponse.json(
      { message: "Application count updated", referral: updatedReferral },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
