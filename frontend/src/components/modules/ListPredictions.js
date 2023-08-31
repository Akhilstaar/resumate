import React, { useState, useEffect } from "react";
import axios from "axios";

const ListPredictions = () => {
  const [showListPrediction, setShowListPrediction] = useState(false);
  const [getListPrediction, setGetListPrediction] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const [b, setB] = useState(true);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    if (getListPrediction || refreshList) {
      axios
        .get("/api/resume/viewalldata")
        .then((response) => {
          const data = response.data.resume_data_list;
          setResumeData(data);
          setRefreshList(false); 
          setShowListPrediction(true);
          setGetListPrediction(false);
        })
        .catch((error) => console.error(error));
    }
  }, [showListPrediction, refreshList]);

  const handleShowPredictions = () => {
    setShowListPrediction(true);
    setGetListPrediction(true);
  };

  const handleRefreshList = () => {
    setRefreshList(true); 
  };

  return (
    <div className="mt-5">
      <button
        className="btn btn-primary"
        onClick={showListPrediction ? handleRefreshList : handleShowPredictions}
      >
        {showListPrediction ? "Refresh List" : "View All"}
      </button>

      {showListPrediction && (
        <div>
          <br></br>
          {b ? (
            <div
              className="table-wrap mb-5"
              style={{ height: "245px", overflow: "hidden" }}
            >
              <table className="table table-responsive table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">CPI</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Linkedin</th>
                  </tr>
                </thead>
                <tbody>
                  {resumeData.map((userdata, index) =>
                    userdata.json_string.map((data, innerIndex) => (
                      <tr key={index + innerIndex}>
                        <td>{data.name}</td>
                        <td>{data.education[0].gpa}</td>
                        <td>{data.field_of_study}</td>
                        <td>{data.linkedin_profile_link}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
