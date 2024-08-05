import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import AdminLayout from "../../components/Layout/AdminLayout";
import { IoGridSharp } from "react-icons/io5";
import { Pagination, Popover, Select } from "antd";
import { useAuth } from "../../context/auth";

const Products = () => {
  const { slug } = useParams();
  const { API } = useAuth();
  const [Category, setCategory] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null); // New state for sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isloading, setLoading] = useState(true);

  const perPage = 9;

  const getProducts = async (page = 1) => {
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

      let url;
      if (slug && slug !== "all-products") {
        url = `${API}/api/product/product-category/${slug}`;
      } else {
        url = `${API}/api/product/get-products/${page}`;
      }
      const { data } = await axios.get(url, { params });

      if (data.success) {
        setSortedProducts(data.products);
        setCategory(
          data.category || { name: "All Products", slug: "all-products" }
        );
        setTotalProducts(data.totalProducts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(currentPage, sortOrder);
  }, [slug, currentPage, sortOrder]);

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to first page on sort change
  };
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalProducts);

  return (
    <AdminLayout heading="All Products" isloading={isloading}>
      <div className="bg-white px-4 p-md-4 rightwhite">
        <div className="pb-5 my-4 productsboard">
          <div className="rightwhite">
            <h2 className="text-uppercase">{Category.name}</h2>
            <div className="d-flex justify-content-between pe-md-5">
              <div>
                <span>
                  Showing {startItem}-{endItem} of {totalProducts} results
                </span>
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
                  <ProductCard
                    product={p}
                    url="/dashboard/admin/product-update"
                  />
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
    </AdminLayout>
  );
};

export default Products;
