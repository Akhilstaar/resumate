import React, { useState, useEffect } from "react";
import ListApplicants from "@/components/modules/ListApplicants";

function CompanyDashboard() {
  let company = "Optiver";
  let applications_count = 500;
  return (
    <main className="flex justify-center items-center h-full">
      <h1 style={{"textAlign":"center"}}>Resumate</h1>
      <hr></hr>
            <div className='p-5 bg-light rounded-3'>
                <div className='container-fluid py-3'>
                    <h1 className='display-5 fw-bold'>
                        Company Dashboard
                    </h1>
                    <div className='fs-4 mt-3'>
                        Welcome, {company}
                        <span>Applications received: {applications_count} </span>
                        <ListApplicants />
                    </div>
                </div>
            </div>
    </main>
  );
}

export default CompanyDashboard;

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
