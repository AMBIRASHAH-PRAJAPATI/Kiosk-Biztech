import React, { useEffect } from "react";
import "./AdminLayout.css";
import AdminManu from "./AdminManu";
import Spinner from "../../components/spinner/spinner";

const AdminLayout = ({ heading, children, isloading = false }) => {
  useEffect(() => {
    if (isloading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [isloading]);

  return (
    <div id="Admin-Panel">
      <div className="admin-sidebar">
        <AdminManu />
        <div className="navbelow"></div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-hero d-flex justify-content-between align-items-center px-4 py-5">
          <h2 className="mb-0 fw-bold">{heading}</h2>
          <span>User / Laptop</span>
        </div>
        {isloading && <Spinner />}
        <main className="p-2 p-md-4 p-lg-5">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
