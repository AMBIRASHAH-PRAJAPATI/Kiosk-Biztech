import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Loader from "../spinner/Loader";

export default function AdminRoutes() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { AuthorizationToken, API } = useAuth();
  const navigate = useNavigate();

  const checkAdminAuth = async () => {
    try {
      console.log(AuthorizationToken);
      const response = await axios.get(`${API}/api/admin/admin-auth`, {
        headers: {
          Authorization: AuthorizationToken,
        },
      });
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

  return isAdmin ? <Outlet /> : <Loader />;
}
