import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import "./Lader.css";
import { useAuth } from "../../context/auth";

const Loader = ({ path = "login" }) => {
  const [count, setCount] = useState(6);
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [eyePosition, setEyePosition] = useState({ cx: 130, cy: 65 });

  const handleMouseMove = (evt) => {
    const x = evt.clientX / window.innerWidth;
    const y = evt.clientY / window.innerHeight;
    setEyePosition({ cx: 115 + 30 * x, cy: 50 + 30 * y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((precount) => precount - 1);
    }, 1000);

    if (count === 0) {
      LogoutUser();
      navigate(`/${path}`, { state: location.pathname });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location.pathname, path]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      message.error("Access denied");
      clearInterval(interval2); // Clear interval after showing toast once
    }, 1000);

    return () => clearInterval(interval2); // Cleanup function to clear interval on unmount
  }, []);

  const Gohome = () => {
    LogoutUser();
    navigate("/");
  };

  return (
    <div id="loader">
      <div className="text-center pt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="robot-error"
          viewBox="0 0 260 118.9"
          role="img"
        >
          <title xmlLang="en">403 Error</title>
          <defs>
            <clipPath id="white-clip">
              <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />
            </clipPath>
            <text id="text-s" className="error-text" y="106">
              403
            </text>
          </defs>
          <path
            className="alarm"
            fill="#e62326"
            d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
          />
          <use xlinkHref="#text-s" x="-0.5px" y="-1px" fill="black"></use>
          <use xlinkHref="#text-s" fill="#2b2b2b"></use>
          <g id="robot">
            <g id="eye-wrap">
              <use xlinkHref="#white-eye"></use>
              <circle
                id="eyef"
                className="eye"
                clipPath="url(#white-clip)"
                fill="#000"
                stroke="#2aa7cc"
                strokeWidth="2"
                strokeMiterlimit="10"
                cx={eyePosition.cx}
                cy={eyePosition.cy}
                r="11"
              />
              <ellipse
                id="white-eye"
                fill="#2b2b2b"
                cx="130"
                cy="40"
                rx="18"
                ry="12"
              />
            </g>
            <circle
              className="lightblue"
              cx="105"
              cy="32"
              r="2.5"
              id="tornillo"
            />
            <use xlinkHref="#tornillo" x="50"></use>
            <use xlinkHref="#tornillo" x="50" y="60"></use>
            <use xlinkHref="#tornillo" y="60"></use>
          </g>
        </svg>
        <h1>You are not allowed to enter here</h1>
        <p>Redirecting to Homepage in {count} sec.</p>
        <h2>
          Go
          <span className="redirect" onClick={() => Gohome()}>
            Home!
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Loader;
