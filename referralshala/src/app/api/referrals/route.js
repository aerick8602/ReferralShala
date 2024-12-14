export async function GET() {
    return new Response(
      JSON.stringify({
        success: true,
        message: "List of referrals",
        referrals: [
          {
            id: 1,
            employer_id: 1,
            job_title: "Software Engineer",
            job_description: "Develop and maintain web applications.",
            location: "New York, USA",
            posted_at: "2024-12-01T10:00:00Z",
            updated_at: "2024-12-02T10:00:00Z"
          },
          {
            id: 2,
            employer_id: 2,
            job_title: "Data Scientist",
            job_description: "Analyze and interpret complex data sets.",
            location: "San Francisco, USA",
            posted_at: "2024-12-05T12:00:00Z",
            updated_at: "2024-12-06T12:00:00Z"
          }
        ]
      }),
      { status: 200 }
    );
  }
  

  