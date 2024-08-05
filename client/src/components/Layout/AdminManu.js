import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import { FaUser, FaHome } from "react-icons/fa";
import Hamburger from "hamburger-react";
import useCategory from "../../hooks/useCategory.js";
import { message, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const AdminManu = () => {
  const navigate = useNavigate();
  const { Categories } = useCategory();
  const { LogoutUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 776);

  const toggleNav = () => {
    if (window.innerWidth < 768) {
      setOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    toggleNav();
    LogoutUser();
    message.success("Logout Successfully");
    navigate("/");
  };

  const handleMenuClick = (e) => {
    if (e.key === "all") {
      navigate(`/dashboard/admin/products/all-products`);
    } else {
      navigate(`/dashboard/admin/products/${e.key}`);
    }
    toggleNav();
  };

  const categoryMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All Products</Menu.Item>
      {Categories.map((category) => (
        <Menu.Item key={category.slug}>{category.name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <header className={`${isMobile ? "main-nav" : "admin-header"}`}>
      <div className="mainlogo">
        <NavLink
          href=""
          to="/"
          className="text-capitalized"
          onClick={toggleNav}
        >
          <h2 className="">Brand</h2>
        </NavLink>
      </div>
      <div className={`navigation ${isOpen ? "opennave" : ""}`}>
        <nav className={`${isMobile ? "mainmenu" : ""}`}>
          <ul>
            <li>
              <NavLink
                onClick={toggleNav}
                to="/dashboard/admin"
                className="text-capitalized"
              >
                <FaUser /> Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleNav}
                to="/dashboard/admin/create-category"
                className="text-capitalized"
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleNav}
                to="/dashboard/admin/create-product"
                className="text-capitalized"
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <Dropdown overlay={categoryMenu} placement="bottomLeft" arrow>
                <span className="nav-link text-white">
                  Products <DownOutlined />
                </span>
              </Dropdown>
            </li>

            <li>
              <NavLink onClick={toggleNav} to="/" className="text-capitalized">
                <FaHome /> Home
              </NavLink>
            </li>
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
        </nav>
      </div>
      <div className="togleicon">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </header>
  );
};

export default AdminManu;
