import { NextResponse } from "next/server";
import client from "../../../../connection/prisma";

export async function GET(req,{ params }) {
  const {userId} =await params; 
  console.log("ID",userId)
  try {
    const user = await client.user.findUnique({
        where: { userId:userId },
    });

    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: `User with ID ${userId} not found.` }, { status: 404 });
  }
}