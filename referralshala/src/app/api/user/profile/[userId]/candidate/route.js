import { NextResponse } from "next/server";
import client from "../../../../../../connection/prisma";



export async function PATCH(req, { params }) {
  const { userId } = await  params;  // Extract `userId` from params
  const body = await req.json(); 
  console.log("Body :",body)
  const { skills, resume, location, contactNumber, socialLinks } = body;

  try {
    // Build updateData object conditionally
    const updateData = {
      ...(skills !== undefined && { skills }),
      ...(resume !== undefined && { resume }),
      ...(location !== undefined && { location }),
      ...(contactNumber !== undefined && { contactNumber }),
      ...(socialLinks !== undefined && { socialLinks }),
    };
    console.log("Update Candidate Data :",updateData)

    // If no fields are provided for update, return an error
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields provided for update." },
        { status: 400 }
      );
    }

    // Update the candidate data in the database
    const updatedCandidate = await client.candidate.update({
      where: { userId: parseInt(userId) },
      data: updateData,
    });

    return NextResponse.json(
      { success: true, data: updatedCandidate },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating candidate:", error);
    return NextResponse.json(
      { success: false, message: `Error updating candidate with userId ${userId}.` },
      { status: 500 }
    );
  }
}



export async function GET(req, { params }) {
    const { userId } = await params;


    if (!userId ) {
        return NextResponse.json(
            { success: false, message: "Invalid userId provided." },
            { status: 400 }
        );
    }
    
    try {
      const profile = await client.candidate.findUnique({
        where: { userId: parseInt(userId) },
        
      });
      // console.log(profile)
      if (!profile) {
        return NextResponse.json(
          { success: false, message: `candidate with userId ${userId} not found.` },
          { status: 404 }
        );
      }
    
      return NextResponse.json(
        { success: true, data: profile },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: `Error fetching candidate with userId ${userId}.` },
        { status: 500 }
      );
    }
  }




//   import { NextResponse } from 'next/server'; 
// import client from "../../../../../../connection/prisma";

// export async function PUT(req, { params }) {
//   const { userId } = params; // Extract userId from the URL
//   const body = await req.json(); // Parse JSON body
  
//   // Exclude any unnecessary fields to avoid Prisma validation errors
//   const { skills, resume } = body;

//   // Validate input fields
//   if (skills === undefined && resume === undefined) {
//     return NextResponse.json(
//       { success: false, message: "No valid fields provided to update." },
//       { status: 400 }
//     );
//   }

//   try {
//     const updatedCandidate = await client.candidate.update({
//       where: { userId: parseInt(userId) },
//       data: {
//         ...(skills !== undefined && { skills }), // Update only if `skills` is provided
//         ...(resume !== undefined && { resume }), // Update only if `resume` is provided
//       },
//     });

//     return NextResponse.json(
//       { success: true, data: updatedCandidate },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating candidate:", error);
//     return NextResponse.json(
//       { success: false, message: `Error updating candidate with userId ${userId}.`, error: error.message },
//       { status: 500 }
//     );
//   }
// }
