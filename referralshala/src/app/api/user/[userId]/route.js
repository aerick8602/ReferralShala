import { NextResponse } from "next/server";
import client from "../../../../connection/prisma";

export async function GET(req,{ params }) {
  const {userId} =await params; 
  console.log("ID",userId)
  try {
    const user = await client.user.findUnique({
        where: { userId:userId },
    });
    // console.log(user )
    return NextResponse.json(
      { success: true, data: user }, 
      { status: 200 })
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: `User with ID ${userId} not found.` }, 
      { status: 404 });
  }
}

export async function PUT(req,{ params }) {
  const {userId} =await params; 
  const body= await req.json();
  // console.log(body)
  const {userType}=body;

  // console.log("ID",userId)
  // console.log("userType :",userType);
  try {
    const user = await client.user.update({
        where: { userId:userId },
        data:{userType:userType},
    });
    // console.log(user )
    return NextResponse.json(
      { success: true, data: user }, 
      { status: 200 })
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: `User with ID ${userId} not found.` }, 
      { status: 404 });
  }
}



