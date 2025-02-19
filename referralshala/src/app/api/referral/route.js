import { NextResponse } from "next/server";
import client from "../../../connection/prisma";

export async function GET() {
  try {
    const referrals = await client.referral.findMany();

    if (!referrals) {
      return NextResponse.json(
        { success: false, message: ` no referrals` },
        { status: 404 }
      );
    }

    const data = formatUserData(referrals);
    console.log(data);
    
    return NextResponse.json(
      { success: true, data: referrals },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch referrals." },
      { status: 500 }
    );
  }
}

