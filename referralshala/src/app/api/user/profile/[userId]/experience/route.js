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