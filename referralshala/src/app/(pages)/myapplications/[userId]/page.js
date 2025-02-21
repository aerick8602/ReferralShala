"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { HashLoader } from "react-spinners";
import "../../../styles/dashboard.css";
import axios from "axios";
import { useParams } from "next/navigation";
import "../../../styles/Application.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function MyApplications() {
  const params = useParams();
  const userId = params.params;

  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`/api/user/${user.id}`);
        setUserData(response.data.data);
        console.log("Fetched user data:", response.data.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [user]);

  // Dummy data for testing
  const dummyApplications = [
    {
      company: { name: "Google" },
      role: { title: "Software Engineer" },
      appliedOn: "2024-02-01",
      status: { current: "Under Review" },
      applicant: { count: 120 },
    },
    {
      company: { name: "Amazon" },
      role: { title: "Frontend Developer" },
      appliedOn: "2024-01-25",
      status: { current: "Interview Scheduled" },
      applicant: { count: 85 },
    },
    {
      company: { name: "Microsoft" },
      role: { title: "Backend Engineer" },
      appliedOn: "2024-02-05",
      status: { current: "Rejected" },
      applicant: { count: 150 },
    },
    {
      company: { name: "Google" },
      role: { title: "Software Engineer" },
      appliedOn: "2024-02-01",
      status: { current: "Under Review" },
      applicant: { count: 120 },
    },
    {
      company: { name: "Amazon" },
      role: { title: "Frontend Developer" },
      appliedOn: "2024-01-25",
      status: { current: "Interview Scheduled" },
      applicant: { count: 85 },
    },
    {
      company: { name: "Microsoft" },
      role: { title: "Backend Engineer" },
      appliedOn: "2024-02-05",
      status: { current: "Rejected" },
      applicant: { count: 150 },
    },
    {
      company: { name: "Google" },
      role: { title: "Software Engineer" },
      appliedOn: "2024-02-01",
      status: { current: "Under Review" },
      applicant: { count: 120 },
    },
    {
      company: { name: "Amazon" },
      role: { title: "Frontend Developer" },
      appliedOn: "2024-01-25",
      status: { current: "Interview Scheduled" },
      applicant: { count: 85 },
    },
    {
      company: { name: "Microsoft" },
      role: { title: "Backend Engineer" },
      appliedOn: "2024-02-05",
      status: { current: "Rejected" },
      applicant: { count: 150 },
    },
    {
      company: { name: "Google" },
      role: { title: "Software Engineer" },
      appliedOn: "2024-02-01",
      status: { current: "Under Review" },
      applicant: { count: 120 },
    },
    {
      company: { name: "Amazon" },
      role: { title: "Frontend Developer" },
      appliedOn: "2024-01-25",
      status: { current: "Interview Scheduled" },
      applicant: { count: 85 },
    },
    {
      company: { name: "Microsoft" },
      role: { title: "Backend Engineer" },
      appliedOn: "2024-02-05",
      status: { current: "Rejected" },
      applicant: { count: 150 },
    },
  ];

  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="loader-container">
        <HashLoader size={35} color="#fe5757" />
      </div>
    );
  }

  return (
    <>
      <Navbar
        userId={userData.userId}
        userType={userData.userType}
        clerkID={user?.id.replace("user_", "")}
      />
      <h1 className="application-header">My Applications</h1>

      {/*To be Change*/}
      <div className="application-table">
        <DataTable
          value={dummyApplications}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          tableStyle={{ minWidth: "60rem" }}
          emptyMessage="No applications found"
        >
          <Column
            field="company.name"
            header="Company"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="role.title"
            header="Role"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="appliedOn"
            header="Applied On"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="status.current"
            header="Application Status"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="applicant.count"
            header="Number of Applicants"
            style={{ width: "20%" }}
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
