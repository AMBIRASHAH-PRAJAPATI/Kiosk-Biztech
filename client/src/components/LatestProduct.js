import React from "react";
import useLatestProduct from "../hooks/useLatestProduct";
import ProductCard from "./ProductCard";

const LatestProduct = () => {
  const { LatestProducts } = useLatestProduct();
  return (
    <section id="latest-product-home" className=" pt-0 p-sm-5 mb-5 my-md-5">
      <div className="container">
        <h2 className="fw-bold px-1 text-center text-md-start text-capitalize unLineheading">
          Latest laptops
        </h2>
        <div className="row mt-5 justify-content-center">
          {LatestProducts.slice(0, 6).map((p) => (
            <div className="col-md-4 col-lg-3 col-xl-2 col-6" key={p._id}>
              <ProductCard product={p} url="/category" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProduct;
