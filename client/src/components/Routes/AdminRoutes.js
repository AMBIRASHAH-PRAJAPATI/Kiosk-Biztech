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
      if (response.data.ok) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error checking admin authentication:", error);
    }
  };

  useEffect(() => {
    if (AuthorizationToken) {
      checkAdminAuth();
      console.log(isAdmin);
    } else {
      navigate("/login");
    }
  }, [AuthorizationToken]);

  return isAdmin ? <Outlet /> : <Loader />;
}
