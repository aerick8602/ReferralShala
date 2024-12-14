'use client'

import axios from "axios";
import { useEffect } from "react";

export default function CandidateProfliePage(){
  useEffect(()=>{
    const fetchCandidateDetails = async (params) => {
      try {
        const res = await axios.get('/api/candidate');
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
      }
    };
    fetchCandidateDetails()
  },[])


  return (
    <div>
      <h1>Candidate Proflie Page</h1>
      <p>Welcome to the Candidate Proflie page!</p>
    </div>
  );
};
