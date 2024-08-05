import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./login.css";
import { message } from "antd";

export default function Login() {
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth(); // geting funtion to store in local storage

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("/api/auth/login", user);
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        message.success("Login successfully"); // toast
        storeTokenInLS(res_data.token);
        setUser({ phone: "", password: "" });
        navigate("/");
      } else {
        message.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        setUser({ phone: "", password: "" });
      }
    } catch (error) {
      console.log("login", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div id="loginsec">
      <div className="logincontainser container d-flex justify-content-center align-items-center">
        <form
          className="form_main d-flex flex-column justify-content-center align-items-center"
          onSubmit={handleSubmit}
        >
          <p className="heading">Admin Login</p>
          <div className="inputContainer">
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              className="inputIcon"
            >
              <path
                d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                fill="#000000"
              ></path>
            </svg>
            <input
              id="username"
              className="inputField"
              type="text"
              name="phone"
              placeholder="phone number"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="inputContainer">
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              className="inputIcon"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              id="password"
              className="inputField"
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button id="button">Submit</button>
        </form>
      </div>
    </div>
  );
}
