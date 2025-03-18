import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";

export async function GET(req, { params }) {
  const { userId } = await params;
  console.log("userId", userId);
  try {
    const referrals = await client.referral.findMany({
      where: { userId: parseInt(userId) },
    });

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
  } catch {
    console.log("Error fetching referrals:");

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
