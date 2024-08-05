import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title="Not Found">
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
