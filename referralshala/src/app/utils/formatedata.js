export default function formatUserData(user) {
  // console.log(user);
  if (!user || typeof user !== "object") {
    throw new Error("Invalid user object passed to formatUserData.");
  }

  return {
    id: user.Id,
    userId: user.userId,
    userType: user.userType,
    firstName: user.userData?.first_name || "",
    lastName: user.userData?.last_name || "",
    emailAddress: user.userData?.email_addresses?.[0]?.email_address || "",
    profileImage: user.userData?.image_url || "",
    companyName: user.employer?.companyName || null,
    jobRole: user.employer?.jobRole || null,
    location: user.employer?.location || null,
    skills: user.candidate?.skills || null,
    resume: user.candidate?.resume || null,
    education: user.educations || [],
    experiences: user.experiences || [],
  };
}
