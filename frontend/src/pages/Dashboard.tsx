import DefaultLayout from "@/components/layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import UploadResumeForm from "./UploadResumeForm";

function Dashboard() {
  let user = "Anuj";

  return (
    <main className="flex justify-center items-center h-full">
      <h1 style={{"textAlign":"center"}}>Resumate</h1>
      <hr></hr>
            <div className='p-5 bg-light rounded-3'>
                <div className='container-fluid py-3'>
                    <h1 className='display-5 fw-bold'>
                        User Dashboard
                    </h1>
                    <p className='fs-4 mt-3'>
                        Welcome, {user}
                        <UploadResumeForm/>
                    </p>
                </div>
            </div>
    </main>
  );
}

export default Dashboard;
