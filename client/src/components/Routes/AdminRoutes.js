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
      console.log(response.data.ok);
      if (response.data.ok) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      console.log(isAdmin);
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

  return isAdmin ? <Outlet /> : <Loader />;
}
