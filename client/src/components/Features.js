import React from "react";

function Features() {
  return (
    <section className="bg-org pt-3 pb-5 ">
      <div className="container bg-white my-5 pe-0">
        <div className="row align-items-center ">
          <div
            className="col-md-6 text-center featureimgbox"
            style={{ maxHeight: "650px", overflow: "hidden" }}
          >
            <div className="pe-lg-5" style={{ height: "100%" }}>
              <img
                alt="Best Service"
                className="img-fluid rounded"
                src="/assets/feature.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "650px",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="ps-lg-5 mt-4 mt-lg-0 text-center text-md-start py-3">
              <span className="text-muted mutedfeheading">Features</span>
              <h2 className="fw-bold">
                <span className="unLineheading">Our Features</span>
              </h2>
              <p className="py-2">
                We're committed to providing you with reliable options that fit
                your budget and deliver exceptional value
              </p>
              <div className="row mt-5">
                <div className="col-6 text-center feature">
                  <div className="py-4">
                    <div className="text-muted">
                      <img
                        src="/assets/cod.svg"
                        alt="COD"
                        className="img-fluid "
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "180px",
                        }}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="mt-3 fw-semibold">Cash on Delivery</h4>
                  </div>
                </div>
                <div className="col-6 text-center feature pe-0 pe-sm-2">
                  <div className="py-4">
                    <div className="text-muted ">
                      <img
                        src="/assets/handon.svg"
                        alt="On site service"
                        className="img-fluid "
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "180px",
                        }}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="mt-3 fw-semibold">On site service</h4>
                  </div>
                </div>
                <div className="col-6 text-center feature">
                  <div className="py-4">
                    <div className="text-muted">
                      <img
                        src="/assets/demo.svg"
                        alt="Free demo"
                        className="img-fluid "
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "180px",
                        }}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="mt-3 fw-semibold">Free Demo</h4>
                  </div>
                </div>
                <div className="col-6 text-center feature pe-0 pe-sm-2">
                  <div className="py-4 d-flex flex-column justify-content-between h-100">
                    <div className="text-muted mt-4">
                      <img
                        src="/assets/payment.svg"
                        alt="Flexible payment"
                        className="img-fluid "
                        style={{
                          maxWidth: "50%",
                          height: "auto",
                          maxHeight: "180px",
                        }}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="mt-3 fw-semibold">Flexible Payment</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
