import { NextResponse } from "next/server";
import formatUserData from "../../../utils/formatedata"
import client from "../../../../connection/prisma";

export async function GET(req, { params }) {
  const { userId } = await params;
  // console.log("User ID:", userId);
  try {
    const user = await client.user.findUnique({
      where: { userId: userId },
      include: {
        candidate: true,
        employer: true,
        educations: true,
        experiences: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: `User with ID ${userId} not found.` },
        { status: 404 }
      );
    }
    const userDetails =formatUserData(user)
    // console.log(userDetails);

    return NextResponse.json(
      { success: true, data:userDetails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: `Error fetching user with ID ${userId}.` },
      { status: 500 }
    );
  }
}
