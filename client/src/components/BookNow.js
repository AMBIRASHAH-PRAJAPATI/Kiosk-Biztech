import React from "react";
import { useNavigate } from "react-router-dom";

function BookNow() {
  const navigate = useNavigate();
  const phoneNumber = process.env.REACT_APP_PHONE_NUMBER;

  return (
    <section className="booknowsection py-md-5">
      <div className=".container-fluid py-5">
        <div className="row align-items-center justify-content-center p-5">
          <div className="textleft col-md-5 d-flex flex-column justify-content-center align-items-start">
            <h2 className="fw-bold mb-4 lh-base">
              Looking For, refurbished laptops at{" "}
              <span className="bg-warning text-dark px-1 rounded text-nowrap">
                Lowest prices
              </span>{" "}
              ?
            </h2>

            <p className="text-body-secondary mt-2">
              Explore the and select the laptop of your choise, u can also visit
              shope or Direclty contact us on{" "}
              <span className="bg-info text-dark px-1 rounded fs-3">
                {phoneNumber}
              </span>
            </p>
            <button
              type="button"
              className="btn btn-success px-3 px-md-5 py-2 py-md-4 mb-4 my-md-4 rounded-4"
              onClick={() => {
                navigate("/laptops");
              }}
            >
              Book Now
            </button>
          </div>
          <div className="rightimg col-md-5 d-flex align-items-center justify-content-center py-3 px-0">
            <img
              src="/assets/laptops.png"
              alt="Quality, refurbished laptops"
              className="img-fluid rounded-5"
              style={{ minWidth: "343 px", height: "auto" }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookNow;
