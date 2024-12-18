import { NextResponse } from "next/server";
import client from "../../../../connection/prisma";

export async function GET(req, { params }) {
  const { userId } = await params;
  // console.log("ID", userId);
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
    const userDetails = {
      id: user.id,
      userId: user.userId,
      userType: user.userType,
      firstName: user.userData.first_name,
      lastName: user.userData.last_name,
      email_address: user.userData.email_addresses[0]?.email_address || '',
      profileImage: user.userData?.image_url || '',
      companyName: user?.employer?.company_name || null,
      jobRole: user?.employer?.job_role || null,
      location: user?.employer?.location || null,
      skills: user?.candidate?.skills || null,
      resume: user?.candidate?.resume || null,
      education: user?.educations || [],
      experiences: user?.experiences || [],
    };

    return NextResponse.json(
      { success: true, data: userDetails },
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



export async function PUT(req,{ params }) {
  const {userId} =await params; 
  const body= await req.json();
  const {userType}=body;

  // console.log("ID",userId)
  // console.log(body)

  try {
    
    const user = await client.user.update({
        where: { userId:userId },
        data:{},
    });


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



