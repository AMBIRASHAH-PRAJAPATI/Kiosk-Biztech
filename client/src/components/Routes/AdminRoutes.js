import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Loader from "../spinner/Loader";

export default function AdminRoutes() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();

  const checkAdminAuth = async () => {
    try {
      const response = await axios.get("/api/admin/admin-auth", {
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      console.log("API Response:", response.data);
      setIsAdmin(response.data.ok === true);
    } catch (error) {
      console.error("Error checking admin authentication:", error);
    }
  };

  useEffect(() => {
    if (AuthorizationToken) {
      checkAdminAuth();
    } else {
      navigate("/login");
    }
  }, [AuthorizationToken]);

  useEffect(() => {
    console.log(`Admin status updated: ${isAdmin}`);
  }, [isAdmin]);

  return isAdmin ? <Outlet /> : <Loader />;
}
