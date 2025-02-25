import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      candidateEmail,
      employerEmail,
      candidateName,
      employerName,
      jobTitle,
      companyName,
      profileLink,
    } = await req.json();

    // Read the email templates
    const candidateTemplatePath = path.join(
      process.cwd(),
      "src/app/templates/candidateEmail.html"
    );
    const employerTemplatePath = path.join(
      process.cwd(),
      "src/app/templates/employerEmail.html"
    );

    let candidateHtml = fs.readFileSync(candidateTemplatePath, "utf8");
    let employerHtml = fs.readFileSync(employerTemplatePath, "utf8");

    // Replace placeholders in the templates
    candidateHtml = candidateHtml
      .replace("{{candidateName}}", candidateName)
      .replace("{{jobTitle}}", jobTitle)
      .replace("{{companyName}}", companyName)
      .replace("{{profileLink}}", profileLink);

    employerHtml = employerHtml
      .replace("{{employerName}}", employerName)
      .replace("{{candidateName}}", candidateName)
      .replace("{{jobTitle}}", jobTitle)
      .replace("{{companyName}}", companyName)
      .replace("{{profileLink}}", profileLink);

    // Nodemailer transport setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to candidate
    await transporter.sendMail({
      from: `ReferralShala ${process.env.EMAIL_USER}`,
      to: candidateEmail,
      subject: `Your Application for ${jobTitle} at ${companyName}`,
      html: candidateHtml,
    });

    // Send email to employer
    await transporter.sendMail({
      from: `ReferralShala ${process.env.EMAIL_USER}`,
      to: employerEmail,
      subject: `New Candidate Application for ${jobTitle}`,
      html: employerHtml,
    });

    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
