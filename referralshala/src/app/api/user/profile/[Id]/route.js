import { NextResponse } from "next/server";
import client from "../../../../../connection/prisma";
import formatUserData from "../../../../utils/formatedata";


export async function GET(req, { params }) {
  const { Id } = await params;
  // console.log("User ID:", Id);
  

  try {
    const profile = await client.user.findUnique({
      where: { id: parseInt(Id) },
      include: {
        candidate: true,
        employer: true,
        educations: true,
        experiences: true,
      },
    });
    if (!profile) {
      return NextResponse.json(
        { success: false, message: `Profile with ID ${Id} not found.` },
        { status: 404 }
      );
    }

    const userDetails = formatUserData(profile);

    return NextResponse.json(
      { success: true, data: userDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error fetching profile with ID ${Id}.` },
      { status: 500 }
    );
  }
}

