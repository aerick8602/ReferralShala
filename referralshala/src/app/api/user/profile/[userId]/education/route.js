// /api/user/profile/${userid}/education

import { NextResponse } from 'next/server'; 
import client from "../../../../../../connection/prisma";


export async function GET(req, { params }) {
    const { userId } = await params;

    if (!userId ) {
        return NextResponse.json(
            { success: false, message: "Invalid userId provided." },
            { status: 400 }
        );
    }
    
    try {
      const profile = await client.education.findMany({
        where: { userId: parseInt(userId) },
        
      });
      if (!profile) {
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
      return NextResponse.json(
        { success: false, message: `Error fetching profile with userId ${userId}.` },
        { status: 500 }
      );
    }
  }

  export async function POST(req, { params }) {
    const { userId } = await params;
    
    console.log("ferrrrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeff")
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid userId provided." },
        { status: 400 }
      );
    }

    console.log("feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeff")
  
    // Parse request body
    const { instituteName, degree, stream, startYear, endYear, isCurrentlyEducating, grade } = await req.json();
    // Check for missing required fields
    if (
      !instituteName ||
      !degree ||
      !stream ||
      !startYear ||
      isCurrentlyEducating === undefined ||  // Check if isCurrentlyEducating is explicitly provided
      !grade
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields."},
        { status: 400 }
      );
    }
    console.log("fffffffffffffffffffffffffffffffffff")
  
    try {
      // Creating the new education record
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
      console.error("Error creating education record:", error);
      return NextResponse.json(
        { success: false, message: `Error creating education record for userId ${userId}.` },
        { status: 500 }
      );
    }
  }


