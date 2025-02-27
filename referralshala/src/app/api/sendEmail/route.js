import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      candidateUserId,
      candidateEmail,
      employerEmail,
      candidateName,
      employerName,
      jobTitle,
      companyName,
    } = await req.json();

    const candidateProfileURL = `${process.env.BASE_URL}/profile/${candidateUserId}`;
    const jobOpportunitiesLink = `${process.env.BASE_URL}/dashboard/${candidateUserId}`;
    const updateStatusURL = `${process.env.BASE_URL}/api/application/${candidateUserId}`;
    // Log received values for debugging
    // console.log("Received Data:", {
    //   candidateEmail,
    //   employerEmail,
    //   candidateName,
    //   employerName,
    //   jobTitle,
    //   companyName,
    //   candidateProfileURL,
    //   jobOpportunitiesLink,
    // });

    const candidateTemplatePath = path.join(
      process.cwd(),
      "src/app/templates/candidateEmail.html"
    );
    const employerTemplatePath = path.join(
      process.cwd(),
      "src/app/templates/employerEmail.html"
    );

    let candidateHtml, employerHtml;

    try {
      candidateHtml = fs.readFileSync(candidateTemplatePath, "utf8");
      employerHtml = fs.readFileSync(employerTemplatePath, "utf8");
      console.log("✅ Email templates loaded successfully.");
    } catch (err) {
      console.error("❌ Error loading email templates:", err);
      return NextResponse.json(
        { error: "Failed to load email templates" },
        { status: 500 }
      );
    }

    // Replace placeholders in the email templates (ensuring global replacements)
    const replacePlaceholders = (html, replacements) => {
      return Object.entries(replacements).reduce(
        (content, [key, value]) =>
          content.replace(new RegExp(`{{${key}}}`, "g"), value),
        html
      );
    };

    candidateHtml = replacePlaceholders(candidateHtml, {
      candidateName,
      jobTitle,
      companyName,
      candidateProfileURL,
      jobOpportunitiesLink,
    });

    employerHtml = replacePlaceholders(employerHtml, {
      employerName,
      candidateName,
      jobTitle,
      companyName,
      candidateProfileURL,
      updateStatusURL,
    });

    // console.log("✅ Email templates processed with user data.");

    // Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // console.log("✅ Nodemailer transporter configured.");

    // Log the final processed email content for debugging
    // console.log("🔹 Final Processed Candidate Email HTML:\n", candidateHtml);
    // console.log("🔹 Final Processed Employer Email HTML:\n", employerHtml);

    // Send email to candidate
    const candidateMailResponse = await transporter.sendMail({
      from: `ReferralShala <${process.env.EMAIL_USER}>`,
      to: candidateEmail,
      subject: `Your Application for ${jobTitle} at ${companyName}`,
      html: candidateHtml,
    });

    // console.log(
    //   "📩 Candidate email sent. Message ID:",
    //   candidateMailResponse.messageId
    // );

    // Send email to employer
    const employerMailResponse = await transporter.sendMail({
      from: `ReferralShala <${process.env.EMAIL_USER}>`,
      to: employerEmail,
      subject: `New Candidate Application for ${jobTitle}`,
      html: employerHtml,
    });

    // console.log(
    //   "📩 Employer email sent. Message ID:",
    //   employerMailResponse.messageId
    // );

    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
