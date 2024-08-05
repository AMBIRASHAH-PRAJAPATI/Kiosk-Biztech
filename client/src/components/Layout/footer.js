import React from "react";
import { NavLink } from "react-router-dom";
import GoogleMap from "../GoogleMap";
import "./footer.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import useCategory from "../../hooks/useCategory";

const Footer = () => {
  const { Categories } = useCategory();
  return (
    <footer>
      <div className="footerr">
        <div className="container text-light p-5">
          <div className="row justify-content-center py-5">
            {/* First Column */}
            <div className="col-md-6">
              <div className="row mb-4">
                <div className="col-6">
                  <h2 className="fw-bolder text-white py-4">explore</h2>
                  <nav>
                    <ul className="ps-0">
                      {Categories.slice(0, 5).map((c, index) => (
                        <li className="my-3" key={index}>
                          <NavLink
                            to={`/category/${c.slug}`}
                            className="text-left text-capitalized text-white"
                          >
                            {c.name}
                          </NavLink>
                        </li>
                      ))}
                      <li className="my-3">
                        <NavLink
                          to="/"
                          className="text-left text-capitalized text-white"
                        >
                          Home
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* 2nd Section: policies */}
                <div className="col-6">
                  <h2 className="fw-bolder text-white py-4">Policies</h2>
                  <nav>
                    <ul className="ps-0">
                      <li className="my-3">
                        <NavLink
                          to="/privacy-policy"
                          className="text-left text-white"
                        >
                          Privacy Policy
                        </NavLink>
                      </li>
                      <li className="my-3">
                        <NavLink
                          to="/term-and-cindition"
                          className="text-left text-white"
                        >
                          Term and condition
                        </NavLink>
                      </li>
                      <li className="my-3">
                        {" "}
                        <NavLink to="/about" className="text-left text-white">
                          about
                        </NavLink>
                      </li>
                      <li className="my-3">
                        <NavLink to="/contact" className="text-left text-white">
                          Contact us
                        </NavLink>
                      </li>
                      <li className="my-3">
                        <NavLink to="/laptops" className="text-left text-white">
                          visit store{" "}
                          <HiOutlineArrowNarrowRight className="arrow" />
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Bottom Section: Company Logo */}
              <div className="row justify-content-center mb-5">
                <div className="col-md-12 d-flex justify-content-start ps-0">
                  <img
                    src="/assets/kiosk-biztech-logo.png"
                    alt="kiosk-biztech"
                    className="kiosk-biztech-logo bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="col-md-6 p-0">
              {/* Map Section */}
              <div className="addressmap bg-white p-4">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center p-5 text-white allright">
        <div>
          <p className="fs-5 mb-0">
            Copyright &#169; 2024 Kiosk Biztech. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
