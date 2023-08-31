import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import ListPredictions from "@/components/modules/ListPredictions";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
// import UserTable from "@/components/modules/UserTable";

const CompanyDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [userdata, setUserData] = useState([]);
  const [b, setB] = useState(true);
  const [refreshList, setRefreshList] = useState(false);
  const [showResumeData, setShowResumeData] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const router = useRouter();
  const refresh = Cookies.get("refresh_token");
  const access_token = Cookies.get("access_token");

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    fetch("/api/user/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    if (!access_token) {
      window.location.href = "/login";
      setAuthenticated(false);
      return;
    }

    axios
      .post("/api/token/verify", {
        token: access_token,
      })
      .then((res) => {
        setAuthenticated(true);
      })
      .catch((error) => {
        axios
          .post("/api/token/refresh", {
            refresh: refresh,
          })
          .then((res) => {
            Cookies.set("access_token", res.data.access);
            Cookies.set("refresh_token", res.data.refresh);
            setAuthenticated(true);
            window.location.reload();
          })
          .catch((error) => {
            setError(error.response.data.detail);
            setAuthenticated(false);
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            console.log(error);
            window.location.href = "/login";
          });
      });
  }, [access_token, refresh]);

  const handleLogout = async () => {
    const body = JSON.stringify({
      refresh,
    });

    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: body,
      });

      if (res.ok) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setAuthenticated(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const handleShowResumeData = () => {
    setShowResumeData(true);
  };

  const handleRefreshList = () => {
    setRefreshList((prev) => !prev);
  };

  if (!authenticated) {
    return null;
  }
  let applications_count = 500;

  let temp_users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      age: 30,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      age: 25,
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      age: 40,
    },
  ];

  return (
    <DefaultLayout title="Dashboard" content="Dashboard page for Resumate">
      <main className="flex justify-center items-center h-full">
        <div className='p-5 bg-light rounded-3'>
          <div className='container-fluid py-3'>
            <div className="row">
              <h1 className='display-5 fw-bold col-6'>
                Company Dashboard
              </h1>
              <div className="col-6">
                <button className="btn btn-primary mt-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className='fs-4 mt-3 row'>
              Welcome, {userdata.username}
            </div>

          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card">
              <div className="p-3 d-flex align-items-center">
                <span className="me-3 stamp stamp-md bg-blue text-white me-3">
                  <i className="icon fe fe-dollar-sign"></i>
                </span>
                <div>
                  <div className="m-0"><small>Applications received</small> : {applications_count}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='fs-4 mt-3'>
            {/* <UserTable users={temp_users} /> */}
            <ListPredictions />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default CompanyDashboard;


import React from "react";

function getWindowSize() {
  if (typeof window === "undefined") {
    return { innerWidth: 0, innerHeight: 0 };
  }
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
