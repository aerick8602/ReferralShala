import { NextResponse } from "next/server";
import client from "../../../connection/prisma";


export async function GET() {
  try {
    const employers = await client.employer.findMany();

    return NextResponse.json(employers, { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching the referrals.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
