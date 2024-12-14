export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      message: "Employer details",
      Details: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        contact_number: "9323323446",
        profile_picture_url: "https://example.com/profile",
        company_name: "Microsoft",
        job_role: "SDE 1",
        location: "Noida",
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
        updated_at: "2024-12-01T10:00:00Z",
      },
    }),
    { status: 200 }
  );
}
