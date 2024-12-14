export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Candidate details",
      Details: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        contact_number: "9323323446",
        profile_picture_url: "https://example.com/profile1.jpg",
        skills: ["JavaScript", "React", "Node.js"],
        resume_url: "https://example.com/resume1.pdf",
        education: [
          {
            institute_name: "University of XYZ",
            degree: "B.Tech",
            specialization: "Computer Science",
            start_year: 2016,
            end_year: 2020,
            percentage_or_cgpa: 8.5,
          },
        ],
        experience: [
          {
            company_name: "Tech Solutions",
            role: "Software Engineer Intern",
            start_year: 2021,
            end_year: 2023,
            description: "Worked on building web applications.",
          },
        ],
        updated_at: "2024-12-01T10:00:00Z",
      },
    }),
    { status: 200 }
  );
}
