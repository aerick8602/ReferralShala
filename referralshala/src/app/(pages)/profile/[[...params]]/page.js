"use client";

import { useUser } from "@clerk/nextjs";
import { Toast } from "primereact/toast";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import EmployerProfile from "./employerprofile";
import CandidateProfile from "./candidateprofile";
import { useEffect, useRef, useState } from "react";

export default function ProfilePage() {
  const { user } = useUser();
  const params = useParams();
  const userId = params.params[0];

  const [isauth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [candidateData, setCandidateData] = useState({});
  const [employerData, setEmployerData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [candidateSkills, setCandidateSkills] = useState([]);
  const [resume, setResume] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);
  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  /*####################  apis  #####################*/
  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user/profile/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("User Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  const fetchCandidateData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/candidate`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Candidate Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      return null;
    }
  };
  const fetchEmployerData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/employer`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Employer Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching employer data:", error);
      return null;
    }
  };
  const fetchEducationData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/education`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Education Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching education data:", error);
      return null;
    }
  };
  const fetchExperienceData = async (userId) => {
    try {
      const res = await fetch(`/api/user/profile/${userId}/experience`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("Experinece Data :", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching experience data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    console.log("UserId :", userId);
    setIsLoading(true);
    try {
      // Fetch userData, educationData, and experienceData first
      const [userData, educationData, experienceData] = await Promise.all([
        fetchUserData(userId),
        fetchEducationData(userId),
        fetchExperienceData(userId),
      ]);

      setUserData(userData);
      setEducationData(educationData || []);
      setExperienceData(experienceData || []);

      // Check if the user is an employer or candidate
      if (userData?.userType === "employer") {
        // Fetch employer-specific data
        const employerData = await fetchEmployerData(userId);
        setEmployerData(employerData);
      } else {
        // Fetch candidate-specific data
        const candidateData = await fetchCandidateData(userId);
        setCandidateData(candidateData);
        setCandidateSkills(candidateData?.skills || []);
        setResume(candidateData?.resume || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEducationData = async (educationData) => {
    try {
      if (!userId) {
        console.error("User ID is missing");
        return;
      }

      const response = await fetch(`/api/user/profile/${userId}/education`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(educationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      showToast("secondary", "Added", "Education data added successfully!");
      return data;
    } catch (error) {
      console.error("Error updating education data:", error);
    }
  };
  const updateEducationData = async (educationData) => {
    console.log(educationData);
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/education/${educationData.educationId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(educationData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      showToast("secondary", "Updated", "Education data updated successfully!");
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };
  const deleteEducationData = async (educationId) => {
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/education/${educationId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Deletion successful:", data);
      showToast("secondary", "Deleted", "Education data deleted successfully!");
    } catch (error) {
      console.error("Error deleting education data:", error);
    }
  };

  const addExperienceData = async (experienceData) => {
    console.log(experienceData);
    try {
      const response = await fetch(`/api/user/profile/${userId}/experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experienceData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      showToast("secondary", "Added", "Experience added successfully!");
      console.log("Update successful:", data);
      return data;
    } catch (error) {
      console.log("error adding exp", error);
    }
  };
  const updateExperienceData = async (experienceData) => {
    console.log(experienceData);
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/experience/${experienceData.experienceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(experienceData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update EXP successful:", data);
      showToast("secondary", "Updated", "Experience updated successfully!");
      return data;
    } catch (error) {
      console.log("Error updating EXP", error);
      return null;
    }
  };
  const deleteExperienceData = async (experienceId) => {
    try {
      const response = await fetch(
        `/api/user/profile/${userId}/experience/${experienceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("delete successful:", data);
      showToast("secondary", "Deleted", "Experience deleted successfully!");
      return data;
    } catch (error) {
      console.log("Error deleting candidate:", error);
      return null;
    }
  };

  const updateUserData = async (firstname, lastname, imageurl) => {
    try {
      const response = await fetch(`/api/user/profile/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, imageurl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      return data;
    } catch (error) {
      console.log("Error updating candidate:", error);
      return null;
    }
  };
  const updateCandidateData = async (CandidateData) => {
    try {
      if (typeof CandidateData !== "object" || CandidateData === null) {
        throw new Error("Data must be a non-null object.");
      }
      const requestBody = {
        ...(CandidateData.skills !== undefined && {
          skills: CandidateData.skills,
        }),
        ...(CandidateData.resume !== undefined && {
          resume: CandidateData.resume,
        }),
        ...(CandidateData.location !== undefined && {
          location: CandidateData.location,
        }),
        ...(CandidateData.contactNumber !== undefined && {
          contactNumber: CandidateData.contactNumber,
        }),
        ...(CandidateData.socialLinks !== undefined && {
          socialLinks: CandidateData.socialLinks,
        }),
      };

      console.log("RequestBody:", requestBody);

      const response = await fetch(`/api/user/profile/${userId}/candidate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      showToast("secondary", "Updated", "Data updated successfully!");
      const data = await response.json();

      console.log("Update successful:", data);

      return data;
    } catch (error) {
      console.log("Error updating candidate:", error);
      return null;
    }
  };
  const updateEmployerData = async (EmployerData) => {
    try {
      if (typeof EmployerData !== "object" || EmployerData === null) {
        throw new Error("Data must be a non-null object.");
      }
      const requestBody = {
        ...(EmployerData.location !== undefined && {
          location: EmployerData.location,
        }),
        ...(EmployerData.contactNumber !== undefined && {
          contactNumber: EmployerData.contactNumber,
        }),
        ...(EmployerData.socialLinks !== undefined && {
          socialLinks: EmployerData.socialLinks,
        }),
        ...(EmployerData.jobRole !== undefined && {
          jobRole: EmployerData.jobRole,
        }),
        ...(EmployerData.companyName !== undefined && {
          companyName: EmployerData.companyName,
        }),
      };

      console.log("RequestBody:", requestBody);

      const response = await fetch(`/api/user/profile/${userId}/employer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      showToast("secondary", "Updated", "Data updated successfully!");
      const data = await response.json();

      console.log("Update successful:", data);

      return data;
    } catch (error) {
      console.log("Error updating employer:", error);
      return null;
    }
  };
  /*####################  apis  #####################*/

  const togglePersonalModel = () =>
    setIsPersonalModalOpen(!isPersonalModalOpen);
  const toggleEducationModel = () =>
    setIsEducationModalOpen(!isEducationModalOpen);
  const toggleExperienceModel = () =>
    setIsExperienceModalOpen(!isExperienceModalOpen);

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    setIsAuth(userData.id == user?.id);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Toast ref={toast} />
      {userData.userType === "candidate" ? (
        <CandidateProfile
          userId={userId}
          isauth={isauth}
          userData={userData}
          setUserData={setUserData}
          candidateData={candidateData}
          setCandidateData={setCandidateData}
          educationData={educationData}
          setEducationData={setEducationData}
          experienceData={experienceData}
          setExperienceData={setExperienceData}
          isPersonalModalOpen={isPersonalModalOpen}
          isEducationModalOpen={isEducationModalOpen}
          isExperienceModalOpen={isExperienceModalOpen}
          candidateSkills={candidateSkills}
          setCandidateSkills={setCandidateSkills}
          resume={resume}
          setResume={setResume}
          addEducationData={addEducationData}
          updateEducationData={updateEducationData}
          deleteEducationData={deleteEducationData}
          addExperienceData={addExperienceData}
          updateExperienceData={updateExperienceData}
          deleteExperienceData={deleteExperienceData}
          updateUserData={updateUserData}
          updateCandidateData={updateCandidateData}
          togglePersonalModel={togglePersonalModel}
          toggleEducationModel={toggleEducationModel}
          toggleExperienceModel={toggleExperienceModel}
        />
      ) : (
        <EmployerProfile
          userId={userId}
          isauth={isauth}
          userData={userData}
          setUserData={setUserData}
          employerData={employerData}
          setEmployerData={setEmployerData}
          educationData={educationData}
          setEducationData={setEducationData}
          experienceData={experienceData}
          setExperienceData={setExperienceData}
          isPersonalModalOpen={isPersonalModalOpen}
          isEducationModalOpen={isEducationModalOpen}
          isExperienceModalOpen={isExperienceModalOpen}
          addEducationData={addEducationData}
          updateEducationData={updateEducationData}
          deleteEducationData={deleteEducationData}
          addExperienceData={addExperienceData}
          updateExperienceData={updateExperienceData}
          deleteExperienceData={deleteExperienceData}
          updateUserData={updateUserData}
          updateEmployerData={updateEmployerData}
          togglePersonalModel={togglePersonalModel}
          toggleEducationModel={toggleEducationModel}
          toggleExperienceModel={toggleExperienceModel}
        />
      )}
    </>
  );
}
