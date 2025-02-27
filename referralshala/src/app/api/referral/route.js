import { NextResponse } from "next/server";
import client from "../../../connection/prisma";

export async function GET() {
  try {
    const referrals = await client.referral.findMany();

    if (!referrals) {
      return NextResponse.json(
        { success: false, message: ` no referrals` },
        { status: 404 }
      );
    }

    // const data = formatUserData(referrals);   
    // console.log(referrals);
    
    return NextResponse.json(
      { success: true, data: referrals },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  } 
}

// export async function GET() {
//   try {
//     console.log("Testing Prisma Connection...");
//     await client.$connect();
//     console.log("Prisma Connected!");

//     const referrals = await client.referral.findMany();
//     console.log("Fetched Referrals:", referrals);

//     if (referrals.length === 0) {
//       return NextResponse.json(
//         { success: false, message: "No referrals found." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: referrals },
//       { status: 200 }
//     );
//   } catch (error) {

//     return NextResponse.json(
//       { success: false, message: error.message || "Failed to fetch referrals." },
//       { status: 500 }
//     );
//   }
// }



