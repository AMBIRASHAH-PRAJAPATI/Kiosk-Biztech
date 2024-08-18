import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ProductsLayout from "../components/Layout/ProductsLayout";
import ProductCard from "../components/ProductCard";
import { IoGridSharp } from "react-icons/io5";
import { IoMdOptions } from "react-icons/io";
import { message, Pagination, Popover, Select } from "antd";
import { useAuth } from "../context/auth";

const CategoryProduct = () => {
  const { slug } = useParams();
  const { API } = useAuth();
  const [Category, setCategory] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null); // New state for sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [isloading, setLoading] = useState(true);

  const perPage = 9;

  const togglefilter = () => {
    if (window.innerWidth < 1001) {
      setOpen(!isOpen);
    } else {
      message.warning("filter is on left side");
    }
  };

  const getProductsByCat = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        perPage,
        slug,
      };

      if (sortOrder) {
        params.sort = "price"; // or use 'createdAt' if needed
        params.order = sortOrder === "Low to High" ? "asc" : "desc";
      }

      const { data } = await axios.get(
        `${API}/api/product/product-category/${slug}`,
        { params }
      );
      if (data.success) {
        setSortedProducts(data.products);
        setCategory(data.category);
        setTotalProducts(data.totalProducts); // Ensure this line is present
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsByCat(currentPage, sortOrder);
  }, [slug, currentPage, sortOrder]);

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const startItem = totalProducts === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalProducts);

  return (
    <Layout title={`Kiosk Biztech - ${Category.slug}`} isloading={isloading}>
      <ProductsLayout isOpen={isOpen} togglefilter={togglefilter}>
        <div className="bg-white px-3 p-md-5 pe-0">
          <div className="py-5 mt-0 my-md-4 productsboard">
            <div className="rightwhite">
              <nav className="py-2">
                <Link to="/" className="link-secondary">
                  <span>Home&nbsp;/&nbsp;</span>
                </Link>
                <Link to="/laptops" className="link-secondary">
                  <span>Laptop &nbsp;/&nbsp;</span>
                </Link>
                <Link
                  className="link-secondary"
                  to={`/category/${Category.slug}`}
                >
                  {Category.name}
                </Link>
              </nav>
              <h2 className="mt-4 text-uppercase">{Category.name}</h2>
              <div className="d-flex justify-content-between pe-md-5 pe-3">
                <div>
                  <span>
                    Showing {startItem}-{endItem} of {totalProducts} results
                  </span>
                  <IoMdOptions
                    onClick={() => {
                      togglefilter();
                    }}
                    className="ms-3"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div>
                  <Select
                    className="me-3"
                    placeholder="Sorting"
                    allowClear
                    onChange={handleSortChange}
                    options={[
                      {
                        value: "Low to High",
                        label: "Low to High",
                      },
                      {
                        value: "High to Low",
                        label: "High to Low",
                      },
                    ]}
                  />
                  <Popover placement="top" content="Grid View" trigger="hover">
                    <span
                      className="d-inline-block text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      <IoGridSharp size={24} className="grid-pop" />
                    </span>
                  </Popover>
                </div>
              </div>
              <div className="row mt-5">
                {sortedProducts.map((p) => (
                  <div className="col-md-4 col-6" key={p._id}>
                    <ProductCard product={p} url="/category" />
                  </div>
                ))}
              </div>
            </div>
            <Pagination
              current={currentPage}
              pageSize={perPage}
              total={totalProducts}
              onChange={(page) => setCurrentPage(page)}
              className="mt-4"
            />
          </div>
        </div>
      </ProductsLayout>
    </Layout>
  );
};

export default CategoryProduct;
