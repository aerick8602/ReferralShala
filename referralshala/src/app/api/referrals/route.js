import { NextResponse } from "next/server";
import client from "../../../connection/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { employerId, jobTitle, jobDescription, jobLink, location } = body;
    console.log(body);

    const referral = await client.referral.create({
      data: {
        employerId,
        jobTitle,
        jobDescription,
        jobLink,
        location,
      },
    });

    return NextResponse.json(
      { message: "Referral created successfully", referral },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating the referral.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  try {
    const referrals = await client.referral.findMany();

    return NextResponse.json(referrals, { status: 200 });
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
