import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory.js";
import axios from "axios";
import "../../pages/Style/ProductDetails.css";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../context/auth.js";
import useLatestProduct from "../../hooks/useLatestProduct.js";
import SideProductCard from "../SideProductCard.js";

const ProductsLayout = ({ children, isOpen, togglefilter }) => {
  const { Categories } = useCategory();
  const { API } = useAuth();
  const { LatestProducts } = useLatestProduct();
  const [counts, setCounts] = useState([]);
  const [totalecount, settotalCount] = useState(0);

  const sidebarRef = useRef(null); // Reference to the sidebar

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      sidebarRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/product/product-count-by-category`
        );
        if (data.success) {
          setCounts(data.counts);
        }
      } catch (error) {
        console.log("Error fetching product counts by category:", error);
      }
    };

    const fetchTotalcount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/product/product-count`);
        if (data.success) {
          settotalCount(data.totalecount);
        }
      } catch (error) {
        console.log("Error fetching totale product counts:", error);
      }
    };
    fetchTotalcount();
    fetchCounts();
  }, []);

  return (
    <div className="products-layout py-4 px-lg-0">
      <div className="py-5 pproducts-layout-container">
        <div className="my-lg-5 pt-0 py-lg-4 row position-relative">
          <div
            ref={sidebarRef}
            className={`Product-sidebar col-lg-3 col-xl-2 py-5 px-4 pe-lg-0 px-xl-2  ${
              isOpen ? "openProduct-sidebar" : ""
            }`}
          >
            <div className="categoriesNav mt-5">
              <h3 className="mb-4 mb-xl-5 fw-normal">Categories</h3>
              <nav className="py-2">
                <ul className="ps-0 mt-2 mt-xl-0">
                  <li className="navitem mb-4 mb-xl-5 d-flex justify-content-between">
                    <NavLink
                      to={`/laptops`}
                      className="text-capitalized"
                      style={({ isActive }) => ({
                        color: isActive ? "red" : "black",
                      })}
                    >
                      All Products
                    </NavLink>
                    <span> ({totalecount})</span>
                  </li>
                  {Categories.map((c, index) => {
                    const count =
                      counts.find((count) => count.category === c.slug)
                        ?.count || 0;
                    return (
                      <li
                        className="navitem mb-4 mb-xl-5 d-flex justify-content-between"
                        key={index}
                      >
                        <NavLink
                          to={`/category/${c.slug}`}
                          className="text-capitalized"
                          style={({ isActive }) => ({
                            color: isActive ? "red" : "black",
                          })}
                        >
                          {c.name}
                        </NavLink>
                        <span> ({count})</span>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <span
                className="toglefilter"
                onClick={() => {
                  togglefilter();
                }}
              >
                <RxCross2 style={{ cursor: "pointer", fontSize: "25px" }} />
              </span>
            </div>
            <div className="latestproRecm">
              <h4 className="text-capitalize">Latest products</h4>
              {LatestProducts.slice(0, 2).map((p) => (
                <div key={p._id}>
                  <SideProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
          <div className="Products-right col-lg-9 col-xl-10 ps-lg-5 pe-0">
            <main className="my-lg-5">{children}</main>
          </div>
          {isOpen && (
            <div
              className="backdrop position-fixed top-0 start-0 w-100 h-100"
              onClick={() => togglefilter()}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsLayout;
