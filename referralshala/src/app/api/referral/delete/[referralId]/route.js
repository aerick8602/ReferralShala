import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";

export async function DELETE(req, { params }) {
  try {
    const { referralId } = await params;
    console.log("referralId", referralId);

    if (!referralId) {
      return NextResponse.json(
        { success: false, message: "Referral ID is required." },
        { status: 400 }
      );
    }

    await client.referral.delete({
      where: { referralId: parseInt(referralId) },
    });

    return NextResponse.json(
      { success: true, message: "Referral deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting referral." },
      { status: 500 }
    );
  }
}
