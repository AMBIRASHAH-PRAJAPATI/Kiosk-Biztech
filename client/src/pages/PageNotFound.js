import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout
      title="404 Not Found - Kiosk Biztech"
      description="Sorry, the page you are looking for does not exist. At Kiosk Biztech, we offer a wide range of high-quality refurbished laptops. Use the navigation menu to find the products you need or contact us for assistance."
      keyword="404 Not Found, page not found, Kiosk Biztech, refurbished laptops, laptop store, page error, product search, laptop deals"
      isloading={false}
    >
      <section className="inverted bg-orange">
        <div className="d-flex flex-column container min-vh-100 py-20">
          <div className="row align-items-center justify-content-center justify-content-lg-between my-auto">
            <div className="col-lg-6 order-lg-2">
              <img
                className="img-fluid img404"
                src="/assets/404.svg"
                alt="Figure"
              />
            </div>
            <div className="col-md-8 col-lg-5 order-lg-1 text-center text-lg-start">
              <h1 className="text-white fw-semibold">Sorry, page not found.</h1>
              <Link
                to="/"
                className="btn btn-rounded btn-outline-light rounded-pill p-4"
              >
                Go back to homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PageNotFound;
