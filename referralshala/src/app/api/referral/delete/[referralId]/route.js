
import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";

export async function DELETE(req, { params }) {
  const { Id } = await params; 
  console.log("Id:", Id);

  try {
    const referral = await client.referral.delete({
      where: {
        id: parseInt(Id),
      },
    });

    return NextResponse.json(
      { success: true, data: referral },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete referral." },
      { status: 500 }
    );
  }
}