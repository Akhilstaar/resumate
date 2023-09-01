import React, { useState, useEffect } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

const OVERLAY_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    width: '80%', // Adjust the width as needed
    maxHeight: '80%', // Limit the height and make it scrollable
    overflowY: 'auto', // Enable vertical scrolling
    zIndex: 1000,
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function ProfilePage({ userData, onClose }) {
    const [score, setScore] = useState(0);

    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        const csrftoken = getCookie("csrftoken");
        let token = "";
        if (csrftoken !== undefined) {
            token = csrftoken;
        }
        setCsrfToken(token);
    }, []);

    const handleScoreChange = (event) => {
        setScore(event.target.value);
    };


    const handleScores = async (event) => {
        event.preventDefault();

        if (score) {
            try {
                const formData = new FormData();
                formData.append("test_score", score);
                formData.append("uuid", userData.uuid);
                const access_token = Cookies.get("access_token");

                const response = await fetch("/api/user/updatescore", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                        Authorization: `Bearer ${access_token}`,
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
        }
    };
    const parsedData = userData.json_string[0];
    return (
        <div style={OVERLAY_STYLE} className="overlay">
            <div className="overlay-content">
                <button className="close-button btn btn-danger float-right" onClick={onClose}>
                    X
                </button>
                <section style={{ backgroundColor: '#eee' }}>
                    <MDBContainer className="py-5">
                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px' }}
                                            fluid />
                                    </MDBCardBody>
                                </MDBCard>

                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody className="p-0">
                                        <MDBListGroup flush className="rounded-3">
                                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fas icon="globe fa-lg text-warning" />
                                                <MDBCardText>{parsedData.email}</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fas icon="linkedin fa-lg text-warning" />
                                                <MDBCardText>{parsedData.github_profile_link}</MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                                <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                                <MDBCardText>{parsedData.linkedin_profile_link}</MDBCardText>
                                            </MDBListGroupItem>
                                        </MDBListGroup>
                                    </MDBCardBody>
                                </MDBCard>
                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody className="p-1">
                                        <div className="row">
                                            <form onSubmit={handleScores} className="form">
                                                <div className="form-group">
                                                    <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">
                                                        Update Test Score
                                                    </label>
                                                    <input type="number" className="form-control col-sm-8" onChange={handleScoreChange} />
                                                    <button type="submit" className="btn btn-primary mt-2">
                                                        Submit Test Score
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                    </MDBCardBody>
                                </MDBCard>

                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{parsedData.name}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Department</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{parsedData.field_of_study}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Phone</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{parsedData.phone_number}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>

                                <MDBRow>
                                    <MDBCol md="6">

                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4">Skills</MDBCardText>                                                
                                                <ul>
                                                    {userData.json_string[0].skills.map((skill, index) => (
                                                    <li key={index}>{skill}</li>
                                                    ))}
                                                </ul>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>

                                    <MDBCol md="6">
                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4">Resume Score</MDBCardText>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Overall Score: {userData.overall_score}</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={userData.overall_score} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Completeness Score: {userData.completeness_score}</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={userData.completeness_score_score} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Skills Score: {userData.skill_score}</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={userData.skill_score} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Academic Score: {userData.academic_score}</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={userData.academic_score_score} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>

                                {/* Projects and Summary */}
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                                </MDBProgress>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                                </MDBProgress>

                                                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                                <MDBProgress className="rounded">
                                                    <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                                </MDBProgress>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>
        </div>
    );
}