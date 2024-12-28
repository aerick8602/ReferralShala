// /api/user/profile/${userid}/education
import { NextResponse } from 'next/server'; 
import client from "../../../../../../connection/prisma";



export async function GET(req, { params }) {
    const { userId } = await params;
    // console.log("userId:", userId);

    if (!userId ) {
        return NextResponse.json(
            { success: false, message: "Invalid userId provided." },
            { status: 400 }
        );
    }
    
    try {
      const profile = await client.experience.findMany({
        where: { userId: parseInt(userId) },
        
      });
      if (!profile) {
        return NextResponse.json(
          { success: false, message: `exp with userId ${userId} not found.` },
          { status: 404 }
        );
      }
    
      return NextResponse.json(
        { success: true, data: profile },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: `Error fetching exp with userId ${userId}.` },
        { status: 500 }
      );
    }
  }



  export async function POST(req, { params }) {
    const { userId } =await params;
  
    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json(
        { success: false, message: "Invalid userId provided." },
        { status: 400 }
      );
    }
  
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body." },
        { status: 400 }
      );
    }
  
    const { companyName, role, location, startYear, endYear, isCurrentlyEmployed, description } = body;
  
    if (
      !companyName ||
      !role ||
      !location ||
      !startYear ||
      isCurrentlyEmployed === undefined ||
      !description
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }
  
    try {
      const newExp = await client.experience.create({
        data: {
          userId: parseInt(userId),
          companyName:companyName,
          role,
          location,
          startYear:startYear,
          endYear: endYear || null,
          isCurrentlyEmployed:isCurrentlyEmployed,
          description,
        },
      });
  
      return NextResponse.json(
        { success: true, data: newExp },
        { status: 201 }
      );
    } catch (error) {
      console.log("Error creating exp record:", error);
      return NextResponse.json(
        { success: false, message: `Error creating exp record for userId ${userId}.` },
        { status: 500 }
      );
    }
  }
  