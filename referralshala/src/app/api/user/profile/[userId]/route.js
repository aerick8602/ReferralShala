import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";
import formatUserData from "../../../../utils/formatedata";


export async function GET(req, { params }) {
  const { userId } = await params;
  // console.log("userId:", userId);
  
  try {
    const profile = await client.user.findUnique({
      where: { userId: parseInt(userId) },
    });
    if (!profile) {
      return NextResponse.json(
        { success: false, message: `Profile with userId ${userId} not found.` },
        { status: 404 }
      );
    }
    //  console.log('route.js',profile);
    const userDetails = formatUserData(profile);

    return NextResponse.json(
      { success: true, data: userDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error fetching profile with userId ${userId}.` },
      { status: 500 }
    );
  }
}


export async function PATCH(req, { params }) {
  const { userId } = await params;
  const body = await req.json();

  const { firstname, lastname, imageurl } = body;

  if (!firstname || !lastname) {
    return NextResponse.json(
      { success: false, message: "firstname and secondname are required." },
      { status: 400 }
    );
  }

  try {

    const profile = await client.user.findUnique({
      where: { userId: parseInt(userId) },
    });
    if (!profile) {
      return NextResponse.json(
        { success: false, message: `Profile with userId ${userId} not found.` },
        { status: 404 }
      );
    }

    // console.log(profile);
    const updatedUserdata={
      ...profile.userData,
      first_name:firstname,
      last_name:lastname,
      image_url:imageurl,
    }


    const updatedProfile = await client.user.update({
      where: { userId: parseInt(userId) },
      data: {userData:updatedUserdata},
    });

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: `Profile with userId ${userId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User profile updated successfully.", data: updatedProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: `Error updating profile with userId ${userId}.` },
      { status: 500 }
    );
  }
}
