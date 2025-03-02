"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { useParams } from "next/navigation";
import "../../../styles/Application.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function MyApplications() {
  const params = useParams();
  const userId = params.userId;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);

  const fetchUserId = async () => {
    if (!user?.id) return;

    try {
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data.data);
      console.log("Fetched user data:", response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchApplication = async () => {
    console.log(userId);
    try {
      const res = await fetch(`/api/application/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("application data", data.data);

      const transformedData = data.data.map((item) => ({
        company: { name: item.referral.companyName },
        role: { title: item.referral.jobTitle },
        appliedOn: new Date(item.referral.postedAt).toISOString().split("T")[0], // Format date as YYYY-MM-DD
        status: { current: "Pending" }, // Default status, update accordingly if you have more info
        applicant: { count: item.referral.applicationCount },
        location: item.referral.location,
        jobLink: item.referral.jobLink,
      }));

      console.log("Transformed Data:", transformedData);
      setApplication(transformedData);

      return transformedData;
    } catch (error) {
      console.log("Error fetching referrals data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
    fetchApplication();
    // console.log("Application Data", application);
  }, [user]);

  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }


  const roleTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <span>{rowData.role.title}</span>
        <a
          href={rowData.jobLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2563eb", textDecoration: "none", fontSize: "10px" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1e40af")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#2563eb")}
        >
          <i style={{ fontSize: "12px" }} className="pi pi-external-link"></i>
        </a>
      </div>
    );
  };

  return (
    <>
      <Navbar
        userId={userData.userId}
        userType={userData.userType}
        clerkID={user?.id.replace("user_", "")}
      />
      <h1 className="application-header">My Applications</h1>

      <div className="application-table">
        <DataTable
          value={application}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          tableStyle={{ minWidth: "70rem" }}
          emptyMessage="No applications found"
        >
          <Column
            field="company.name"
            header="Company"
            style={{ width: "15%" }}
            alignHeader="center"
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="role.title"
            header="Role"
            body={roleTemplate}
            style={{ width: "20%" }}
            alignHeader="center"
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="location"
            header="Location"
            style={{ width: "15%" }}
            alignHeader="center"
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="appliedOn"
            header="Applied On"
            style={{ width: "15%" }}
            alignHeader="center"
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          {/* <Column
            field="status.current"
            header="Application Status"
            style={{ width: "15%" }}
            alignHeader="center"
            bodyStyle={{ textAlign: "center" }}
          ></Column> */}
          <Column
            field="applicant.count"
            header="Number of Applicants"
            style={{ width: "15%" }}
            alignHeader="center"
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>

      <br />
      <br />
      <Footer userId={userData.userId} userType={userData.userType} />
    </>
  );
}
