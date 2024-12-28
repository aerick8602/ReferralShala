import { NextResponse } from 'next/server'; 
import client from "../../../../../../connection/prisma";

// GET Handler to fetch user's education profile
export async function GET(req, { params }) {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Invalid userId provided." },
      { status: 400 }
    );
  }

  try {
    const profile = await client.education.findMany({
      where: { userId: parseInt(userId) },
    });

    if (!profile.length) {
      return NextResponse.json(
        { success: false, message: `Profile with userId ${userId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: profile },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching profile:", error);
    return NextResponse.json(
      { success: false, message: `Error fetching profile for userId ${userId}.` },
      { status: 500 }
    );
  }
}

// POST Handler to create or update user's education profile
export async function POST(req, { params }) {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Invalid userId provided." },
      { status: 400 }
    );
  }

  // Parse the incoming request body
  const data = await req.json();
  const { instituteName, degree, stream, startYear, endYear, isCurrentlyEducating, grade } = data;

  // Validate required fields
  if (
    !instituteName ||
    !degree ||
    !stream ||
    !startYear ||
    isCurrentlyEducating === undefined ||
    !grade
  ) {
    return NextResponse.json(
      { success: false, message: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    // Create new education record
    const newEducation = await client.education.create({
      data: {
        userId: parseInt(userId),
        instituteName,
        degree,
        stream,
        startYear,
        endYear: endYear || null,
        isCurrentlyEducating,
        grade,
      },
    });

    return NextResponse.json(
      { success: true, data: newEducation },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating education record:", error);
    return NextResponse.json(
      { success: false, message: `Error creating education record for userId ${userId}.` },
      { status: 500 }
    );
  }
}
