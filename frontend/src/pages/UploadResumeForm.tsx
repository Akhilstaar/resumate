import React, { useState, useEffect } from "react";

function UploadResumeForm() {
  const [file, setFile] = useState<File | null>(null);

  // quick fix hack for csrf for now..
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    const csrftoken = getCookie("csrftoken");
    setCsrfToken(csrftoken);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("resume", file);

        const response = await fetch("/api/resume/upload", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken,
          },
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("Error uploading file");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <main className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit}>
        <h2>Upload Resume</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}

export default UploadResumeForm;

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
