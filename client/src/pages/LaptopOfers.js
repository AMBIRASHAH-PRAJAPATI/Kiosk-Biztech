import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  Checkbox,
  Radio,
  Button,
  Popconfirm,
  Popover,
  Select,
  Pagination,
  message,
} from "antd";
import { Price } from "../components/utils/PricesFilter";
import axios from "axios";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import "./Style/ProductDetails.css";
import ProductCard from "../components/ProductCard";
import { IoGridSharp } from "react-icons/io5";
import { IoMdOptions } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../context/auth";
import SideProductCard from "../components/SideProductCard";
import useLatestProduct from "../hooks/useLatestProduct";

const LaptopOfers = () => {
  const { API } = useAuth();
  const [isloading, setLoading] = useState(true);
  const [filtercategories, setFiltercategories] = useState([]);
  const [pricerange, setPricerange] = useState([]);
  const [Products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const { Categories } = useCategory();
  const { LatestProducts } = useLatestProduct();

  const itemsPerPage = 9;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const togglefilter = () => {
    if (window.innerWidth < 1001) {
      setOpen(!isOpen);
    }
  };
  const handlecheckedCat = (value, id) => {
    if (value) {
      setFiltercategories([...filtercategories, id]);
    } else {
      setFiltercategories(filtercategories.filter((cid) => cid !== id));
    }
  };

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        perPage: itemsPerPage,
        filtercategories: filtercategories.join(","),
        pricerange: pricerange.join(","),
      };
      if (sortOrder) {
        params.sort = "price"; // or use 'createdAt' if needed
        params.order = sortOrder === "Low to High" ? "asc" : "desc";
      }

      const { data } = await axios.get(
        `${API}/api/product/product-list/${page}`,
        {
          params,
        }
      );
      if (data.success) {
        setProducts(data.products);
        setSortedProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(`Error fetching products: ${error}`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const applyFilters = () => {
    setCurrentPage(1);
    setFiltersApplied(true);
    togglefilter();
    message.success("Filters applied successfully!");
  };

  const resetFilters = () => {
    setFiltercategories([]);
    setPricerange([]);
    setSortOrder(null);
    togglefilter();
    setFiltersApplied(true);
    message.success("Filters resett successfully!");
  };

  useEffect(() => {
    if (filtersApplied) {
      fetchProducts(currentPage).then(() => setFiltersApplied(false));
    }
  }, [filtersApplied, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [sortOrder]);

  const startItem =
    totalProducts === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts);

  return (
    <Layout title={"Kiosk Biztech - Best laptop offers"} isloading={isloading}>
      <div className="products-layout">
        <div className="py-5 pproducts-layout-container">
          <div className="my-lg-5 py-4 row position-relative">
            <div
              className={`Product-sidebar col-lg-3 col-xl-2 py-5 px-4 px-xl-2 ${
                isOpen ? "openProduct-sidebar" : ""
              }`}
            >
              <div className="categoriesNav position-relative mt-5 ms-3 ms-lg-5 ms-xl-0 ">
                <h3 className="mb-4 mb-xl-5 fw-normal">Categories</h3>
                <div className="d-flex flex-column mt-0">
                  {Categories.map((category) => (
                    <div
                      className="d-inline-flex align-items-center mb-2"
                      key={category._id}
                    >
                      <Checkbox
                        value={category._id}
                        checked={filtercategories.includes(category._id)}
                        onChange={(e) =>
                          handlecheckedCat(e.target.checked, category._id)
                        }
                      >
                        {category.name}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 ms-lg-5 ms-xl-0">
                <h3 className="fw-normal mb-4">Price</h3>
                <div className="d-flex flex-column mt-0">
                  <Radio.Group
                    value={pricerange}
                    onChange={(e) => setPricerange(e.target.value)}
                  >
                    {Price.map((p) => (
                      <div key={p._id} className="mb-3">
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
              {/* ... other filter elements ... */}
              <div className="d-flex flex-column">
                <Button
                  type="primary"
                  className="mt-4 me-5"
                  onClick={applyFilters}
                >
                  Apply Filter
                </Button>
                <Popconfirm
                  title="Rest the filters"
                  description="Are you sure to reset Filters?"
                  onConfirm={() => {
                    resetFilters();
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger className="mt-4 me-5">
                    Delete FIlter
                  </Button>
                </Popconfirm>
              </div>
              <span
                className="toglefilter"
                onClick={() => {
                  togglefilter();
                }}
              >
                <RxCross2 style={{ cursor: "pointer", fontSize: "24px" }} />
              </span>
              <div className="latestproRecm mt-5">
                <h3 className="text-capitalize">Latest products</h3>
                {LatestProducts.slice(0, 3).map((p) => (
                  <div key={p._id}>
                    <SideProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
            <div className="Products-right col-lg-9 col-xl-10 ps-lg-5 pe-0">
              <div className="my-md-5">
                <div className="bg-white px-3 p-md-5 pe-0">
                  <div className="py-5 mt-0 my-md-4 productsboard">
                    <div className="rightwhite">
                      <nav className="py-2">
                        <Link to="/" className="link-secondary">
                          <span>Home&nbsp;/&nbsp;</span>
                        </Link>
                        <Link to="/laptops" className="link-secondary">
                          <span>Laptop</span>
                        </Link>
                      </nav>
                      <h2 className="mt-4 text-uppercase">All Products</h2>
                      <div className="d-flex justify-content-between pe-md-5 pe-3">
                        <div>
                          <span>
                            Showing {startItem}-{endItem} of {totalProducts}{" "}
                            results
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
                            value={sortOrder}
                            onChange={(value) => setSortOrder(value)}
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
                          <Popover
                            placement="top"
                            content="Grid View"
                            trigger="hover"
                          >
                            <span
                              className="d-inline-block text-primary"
                              style={{ cursor: "pointer" }}
                            >
                              <IoGridSharp size={24} className="grid-pop" />
                            </span>
                          </Popover>
                        </div>
                      </div>
                      {sortedProducts.length === 0 ? (
                        <div
                          id="Noproduct"
                          className="text-center text-secondary d-flex justify-content-center align-items-end"
                        >
                          <h2>No products found</h2>
                        </div>
                      ) : (
                        <div className="row mt-5">
                          {sortedProducts.map((p) => (
                            <div className="col-md-4 col-6 " key={p._id}>
                              <ProductCard product={p} url="/category" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Pagination
                      style={{ marginTop: 16 }}
                      current={currentPage}
                      total={totalProducts}
                      pageSize={9}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {isOpen && (
              <div
                className="backdrop position-fixed top-0 start-0 w-100 h-100"
                onClick={() => setOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LaptopOfers;
