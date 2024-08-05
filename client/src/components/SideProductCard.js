import React from "react";
import { Link } from "react-router-dom";

const SideProductCard = ({ product }) => {
  const categorySlug = product.category
    ? product.category.slug
    : "uncategorized";
  const categoryName = product.category ? product.category.name : "Others";
  return (
    <div className="card mb-3 border-0" style={{ maxWidth: 540 }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <Link
            to={`/category/${categorySlug}/${product.slug}`}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={product.image}
              className="img-fluid rounded-start"
              alt={product.name}
              style={{ maxHeight: "90px", maxWidth: "77px" }}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="col-md-8">
          <div className="card-body ps-0">
            <Link
              to={`/category/${categoryName}/${product.slug}`}
              className="text-dark"
            >
              <h4 className="card-title h4 fw-bold">
                {product.name.slice(0, 100)}
              </h4>
            </Link>
            <p className="card-text mb-0">{categoryName}</p>
            <p className="card-text mb-2">
              <del
                aria-hidden="true"
                className="text-body-secondary opacity-75"
              >
                <span>
                  <bdi className="product-price fs-4">
                    <span className="Price-currencySymbol">₹</span>
                    {product.originalprice}
                  </bdi>
                </span>
              </del>
              <span className="screen-reader-text fs-5">
                Original price was: ₹{product.originalprice}.
              </span>
              <ins aria-hidden="true" className="text-decoration-none">
                <span className="fw-bold">
                  <bdi className="product-price ms-2">
                    <span className="Price-currencySymbol">₹</span>
                    {product.price}
                  </bdi>
                </span>
              </ins>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideProductCard;
