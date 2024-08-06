import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../context/auth.js";
import Hamburger from "hamburger-react";
import SearchInput from "../form/SearchInput.js";
import useCategory from "../../hooks/useCategory.js";
import { message } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, LogoutUser } = useAuth();
  const { Categories } = useCategory();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [isOpen]);

  const toggleNav = () => {
    if (window.innerWidth < 768) {
      setOpen(!isOpen);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Attach scroll event listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    toggleNav();
    LogoutUser();
    message.success("Logout Successfully");
    navigate("/");
  };

  // Predefined category names
  const predefinedCategories = [
    { name: "HP", slug: "hp" },
    { name: "Lenovo", slug: "lenovo" },
    { name: "Dell", slug: "dell" },
    { name: "Apple", slug: "apple" },
  ];

  // Determine which categories to show
  const categoriesToDisplay =
    Categories.length > 0 ? Categories.slice(0, 4) : predefinedCategories;

  return (
    <>
      <nav className={`main-nav ${isScrolled ? "shadow" : ""}`}>
        <div className="mainlogo d-flex align-items-center justify-content-center ms-4 ms-md-2 ms-lg-1">
          <NavLink href="" to="/" onClick={toggleNav}>
            <img
              src="/assets/kiosk-biztech-logo.png"
              alt="kiosk-biztech"
              className="kiosk-biztech-logo"
            />
          </NavLink>
        </div>

        <div className={`navigation ${isOpen ? "opennave" : ""}`}>
          {/* menu */}
          <div className="mainmenu">
            <ul className="ps-lg-3 ps-xl-0 mb-0">
              <li className="navitem">
                <NavLink
                  href=""
                  to="/laptops"
                  className="text-capitalized"
                  onClick={toggleNav}
                >
                  Laptops
                </NavLink>
              </li>
              {categoriesToDisplay.map((c, index) => (
                <li className="navitem" key={index}>
                  <NavLink
                    to={`/category/${c.slug}`}
                    className="text-capitalized"
                    onClick={toggleNav}
                    style={({ isActive }) => ({
                      color: isActive ? "red" : "black",
                    })}
                  >
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 2nd menu*/}
          <div className="menu-2">
            {isLoggedIn ? (
              <ul className="ps-lg-0 mb-0">
                <li className="search-input-wrapper">
                  <SearchInput />
                </li>
                {user.isAdmin && (
                  <li className="navitem">
                    <NavLink
                      to="/dashboard/admin"
                      className="text-capitalized"
                      onClick={toggleNav}
                    >
                      Admin DashBoard
                    </NavLink>
                  </li>
                )}
                <li className="navitem logoutbtn">
                  <button className="Btn" onClick={handleLogout}>
                    <div className="sign">
                      <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                    <div className="text">Logout</div>
                  </button>
                </li>
              </ul>
            ) : (
              <>
                <ul className="ps-lg-0 mb-0">
                  <li className="search-input-wrapper">
                    <SearchInput />
                  </li>
                  <li className="navitem">
                    <NavLink
                      to="/about"
                      className="text-capitalized"
                      onClick={toggleNav}
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="navitem">
                    <NavLink
                      to="/contact"
                      className="text-capitalized"
                      onClick={toggleNav}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="togleicon me-3">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </nav>
      {isOpen && (
        <div
          className="backdrop position-fixed top-0 start-0 w-100 h-100 z-index-5"
          onClick={() => setOpen(false)}
          style={{ zIndex: "1" }}
        ></div>
      )}
      <div className="navbelow"></div>
    </>
  );
};

export default Header;
