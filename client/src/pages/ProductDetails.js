import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Image, Tooltip } from "antd";
import PageNotFound from "./PageNotFound";
import "./Style/ProductDetails.css";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/auth";
import Spinner from "../components/spinner/spinner";

const ProductDetails = () => {
  const params = useParams();
  const { API } = useAuth();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isloading, setLoading] = useState(true);

  const openWhatsApp = () => {
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
    const message = `Hello, I visited your website Kiosk Biztech and I want to buy ${product.name} from ${product.category.slug} category it was of RS ${product.price}`;
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/product/get-product/${params.slug}`
      );
      setProduct(data.product);
      setLoading(false);
      getSimilarProducts(data.product._id, data.product.category._id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/similar-product/${pid}/${cid}`
      );
      setSimilarProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  if (isloading) return <Spinner />;
  if (!product) return <PageNotFound />;

  // Render specifications dynamically
  const renderSpecifications = () => {
    const specs = product.specifications;
    if (!specs || Object.keys(specs).length === 0) {
      return null; // Return null if there are no specifications
    }

    const specEntries = Object.entries(specs); // Convert specifications object to array of [key, value] pairs

    return specEntries.map(([key, value]) => (
      <li className="mb-3" key={key}>
        <span className="fw-medium">{formatSpecLabel(key)}: </span>
        {value}
      </li>
    ));
  };

  // Helper function to format specification labels
  const formatSpecLabel = (label) => {
    const formattedLabel = label
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase());
    return formattedLabel;
  };

  return (
    <Layout>
      <section className="py-5 px-3" id="single_product_sec">
        <div className="container-lg pt-md-5">
          <div className="row mt-2 g-2 g-lg-5">
            <div className="col-md-6 position-relative productimgdiv p-2 d-flex justify-content-center align-items-center">
              <figure className="mb-0 d-flex justify-content-center align-items-center">
                {product.image && (
                  <Image
                    loading="lazy"
                    width="600"
                    height="600"
                    className="card-img-top img-fluid productDetailimage"
                    src={product.image}
                    alt={`Image of ${product.name}`}
                    decoding="async" /* Improve loading performance */
                  />
                )}
              </figure>
              <span className="sale-badge px-4 py-2 rounded-5 shadow fw-medium">
                Sale!
              </span>
              <Tooltip title="Search by image" className="productsearchimg">
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
            </div>

            <div className="col-md-6">
              <div className="details px-md-5">
                {product.category && (
                  <div>
                    <nav className="py-2">
                      <Link to="/" className="link-secondary">
                        <span>Home&nbsp;/&nbsp;</span>
                      </Link>
                      <Link to="/laptops" className="link-secondary">
                        <span>Laptop &nbsp;/&nbsp;</span>
                      </Link>
                      <Link
                        className="link-secondary"
                        to={`/category/${product.category.slug}`}
                      >
                        {" "}
                        {product.category.name}&nbsp;/&nbsp;
                      </Link>
                      <span className="text-body-secondary">
                        {product.name}
                      </span>
                    </nav>
                    <p className="single-product-category mt-3 fw-medium">
                      Pro Laptops,{" "}
                      <Link to={`/category/${product.category.slug}`}>
                        {product.category.name}
                      </Link>
                    </p>
                  </div>
                )}
                <h3 className="single-product-title">{product.name}</h3>

                <h3 className="product-price d-flex align-items-center">
                  <del
                    aria-hidden="true"
                    className="text-body-secondary opacity-75"
                  >
                    <span>
                      <bdi className="product-price">
                        <span className="Price-currencySymbol">₹</span>
                        {product.originalprice}
                      </bdi>
                    </span>
                  </del>
                  <span className="screen-reader-text">
                    Original price was: ₹{product.originalprice}.
                  </span>
                  <ins aria-hidden="true" className="text-decoration-none">
                    <span className="fw-bold">
                      <bdi className="product-price mx-3">
                        <span className="Price-currencySymbol">₹</span>
                        {product.price}
                      </bdi>
                    </span>
                  </ins>
                  <span className="screen-reader-text">
                    Current price is: ₹{product.price}.
                  </span>
                  <span className="badge rounded-pill text-bg-success fs-4">
                    Discount Price
                  </span>
                </h3>
                <div className="specifications py-4">
                  <h4 className="fw-semibold">Specifications</h4>
                  <ul className="px-2 ms-5">
                    <li className="mb-3">
                      <span className="fw-medium">Grade: </span>
                      Refurbished – Superb
                    </li>
                    {renderSpecifications()}
                  </ul>
                </div>

                <Button
                  block
                  type="primary fs-3 fw-medium"
                  style={{
                    padding: "2rem",
                    backgroundColor: "#0056b3", // Darker shade
                    borderColor: "#0056b3",
                  }}
                  onClick={() => openWhatsApp()}
                >
                  Buy Product
                </Button>
                <hr />
                {product.category && (
                  <p className="mb-1">
                    <span className="fw-medium">Categories:</span>{" "}
                    {product.category.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="row py-5 my-5">
            <h2 className="fw-bold">Related Products</h2>
            <div className="row">
              {similarProducts.slice(0, 4).map((sp) => (
                <div className="col-6 col-md-4 col-lg-3" key={sp.slug}>
                  <ProductCard product={sp} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
