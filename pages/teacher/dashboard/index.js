import React, {useState, useEffect} from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import PageBanner from "@/components/Common/PageBanner";
import Link from "@/utils/ActiveLink";
import { redirectUser } from "@/utils/auth";

const index = ({ courses }) => {
  const [totalAssigned, setTotalAssigned] = useState("");

  const totalAssignedCourses = async (ctx) => {
    const { token } = parseCookies(ctx);
    if (!token) {
      redirectUser(ctx, "/");
    }
    const payload = {
      headers: { Authorization: token },
    };
    const url = `${baseUrl}/api/v1/teacher/assigned_courses`;
    const response = await axios.get(url, payload);
    setTotalAssigned(response.data.enrolled.length);
  };

  useEffect(() => {
    totalAssignedCourses();
  }, []);



  return (
    <React.Fragment>
      <PageBanner
        pageTitle="Teacher Dashboard"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Teacher Dashboard"
      />

      <div className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <div className="td-sidebar">
                <ul>
                  <li>
                    <Link href="/teacher/courses" activeClassName="active">
                      <a>My Courses</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teacher/course/create"
                      activeClassName="active"
                    >
                      <a>Create A Course</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teacher/courses/course-edit"
                      activeClassName="active"
                    >
                      <a>Edit My Course</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teacher/course/upload-course-video"
                      activeClassName="active"
                    >
                      <a>Upload Course Video</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teacher/dashboard/assigned_courses"
                      activeClassName="active"
                    >
                      <a>Assigned Courses</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-8 col-lg-8">
              <div className="row">
                <h3>Teacher Dashboard</h3>
                <table className="table table-striped">
                  <thead>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Total no of courses</th>
                      <td>{courses.length}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total no of assigned courses</th>
                      <td>{totalAssigned}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

index.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { courses: [] };
  }

  const payload = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/api/v1/courses/my-courses`;
  const response = await axios.get(url, payload);
  // console.log(response.data)
  return response.data;
};

export default index;