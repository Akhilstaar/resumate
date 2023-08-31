import React from "react";
import UploadResumeForm from "./UploadResumeForm";
// import Dashboard from "./Dashboard";
import CompanyDashboard from "./CompanyDashboard";
export default function Home() {
  return (
    <main>
      <UploadResumeForm />
      <CompanyDashboard />
    </main>
  );
}
