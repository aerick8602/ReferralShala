import { NextResponse } from "next/server";
import formatUserData from "../../../utils/formatedata"
import client from "../../../../connection/prisma";

export async function GET(req, { params }) {
  const { Id } = await params;
  console.log("ID:", Id);
  try {
    const user = await client.user.findUnique({
      where: { Id: Id },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: `User with ID ${Id} not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data:user},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error fetching user with ID ${Id}.` },
      { status: 500 }
    );
  }
}



