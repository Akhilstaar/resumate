import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import UserDetailsOverlay from "./UserDetailsOverlay";
import UserProfile from "./UserProfile";

const ListPredictions = () => {
  const [showListResume, setShowListPrediction] = useState(false);
  const [getListResume, setGetListResume] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const [updatescore, setUpdateScore] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [b, setB] = useState(true);
  const [refreshList, setRefreshList] = useState(false);
  const [filterText, setFilterText] = useState(""); // State for filtering

  const handleScores = async (event) => {
    event.preventDefault();

    if (score && accTokenValid) {
      try {
        const formData = new FormData();
        formData.append("test_score", score);
        formData.append("uuid", userData.uuid);

        const response = await fetch("/api/user/updatescore", {
          method: "POST",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
          body: formData,
        });

        if (response.ok) {
          console.log("Score uploaded successfully");
        } else {
          console.error("Error uploading score");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      console.error("Invalid score or access token.");
    }
  };

  useEffect(() => {
    if (updatescore) {
      axios
        .post("/api/user/list_predictions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setShowResumeData(response.data.prediction);
        })
        .catch((error) => console.error(error));
    }
  }, [access_token, refreshList, showResumeData]);

  useEffect(() => {
    if (getListResume || refreshList) {
      axios
        .get("/api/resume/viewalldata")
        .then((response) => {
          const data = response.data.resume_data_list;
          setResumeData(data);
          setRefreshList(false);
          setShowListPrediction(true);
          setGetListResume(false);
          setB(true);
        })
        .catch((error) => console.error(error));
    }
  }, [showListResume, refreshList]);

  const handleShowResume = () => {
    setShowListPrediction(true);
    setGetListResume(true);
  };

  const handleRefreshList = () => {
    setRefreshList(true);
  };

  const handleUserClick = (uuid) => {
    const user = resumeData.find((user) => user.uuid === uuid);
    setSelectedUserData(user);
  };

  const handleCloseOverlay = () => {
    setSelectedUserData(null);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value); // Update filter text when input changes
  };

  const filteredRows = resumeData.filter((row) => {
    const lowerCaseFilterText = filterText.toLowerCase();
    return (
      row.json_string[0].name.toLowerCase().includes(lowerCaseFilterText) ||
      row.json_string[0].education[0].gpa
        .toString()
        .toLowerCase()
        .includes(lowerCaseFilterText) ||
      row.json_string[0].field_of_study
        .toLowerCase()
        .includes(lowerCaseFilterText) ||
      row.overall_score.toString().toLowerCase().includes(lowerCaseFilterText)
    );
  });

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "cpi", headerName: "CPI", flex: 1 },
    { field: "branch", headerName: "Branch", flex: 1 },
    { field: "score", headerName: "Score", flex: 1 },
  ];

  const rows = filteredRows.map((userdata, index) => ({
    id: userdata.uuid,
    name: userdata.json_string[0].name,
    cpi: userdata.json_string[0].education[0].gpa,
    branch: userdata.json_string[0].field_of_study,
    score: userdata.overall_score,
  }));

  return (
    <div className="mt-5">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Filter by Name, CPI, Branch, Score"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={showListResume ? handleRefreshList : handleShowResume}
      >
        {showListResume ? "Refresh List" : "View All"}
      </button>
      {/* {selectedUserData && (
        <UserDetailsOverlay
          userData={selectedUserData}
          onClose={handleCloseOverlay}
        />
      )} */}
      {selectedUserData && (
        <UserProfile
          userData={selectedUserData}
          onClose={handleCloseOverlay}
        />
      )}


      {showListResume && (
        <div>
          <br />
          {b ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={(params) => handleUserClick(params.row.id)}
              />
            </div>
          ) : (
            <h1>No Predictions done yet !!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default ListPredictions;