import React, { useState } from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const ProductCard = ({ product, url }) => {
  const [value, setValue] = useState(3);

  const categorySlug = product.category
    ? product.category.slug
    : "uncategorized";
  const categoryName = product.category ? product.category.name : "Others";

  return (
    <div className="card m-2 px-0 border-0" key={product._id}>
      <div className="position-relative mb-2">
        <Link to={`${url}/${categorySlug}/${product.slug}`}>
          <div className="image-container">
            <img
              src={product.image}
              className="card-img-top rounded-3 productsCardImg"
              alt={product.name}
              loading="lazy"
            />
          </div>
        </Link>
        <span className="sale-badge px-4 py-2 rounded-pill shadow fw-medium">
          Sale!
        </span>
      </div>
      <div className="card-body text-dark d-flex flex-column justify-content-between ">
        <Link
          to={`${url}/${categorySlug}/${product.slug}`}
          className="text-dark"
        >
          <h4 className="card-title fw-bold ls-1">{product.name}</h4>
        </Link>
        <p className="mb-0 text-body-secondary opacity-75">{categoryName}</p>
        <p className="card-text mb-2">
          <del aria-hidden="true" className="text-body-secondary opacity-75">
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
        </p>
        <Rate tooltips={desc} onChange={setValue} value={value} />
      </div>
    </div>
  );
};

export default ProductCard;
