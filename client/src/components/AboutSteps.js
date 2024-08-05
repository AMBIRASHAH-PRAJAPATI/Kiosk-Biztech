import React from "react";

const AboutSteps = () => {
  return (
    <section className="py-5 my-5">
      <div className="container bg-white shadow py-5">
        {/*- Heading */}
        <div className="row text-center mb-4">
          <div className="col-12 col-lg-10 col-xl-8 mx-auto text-center">
            <p className="text-muted mb-0 fw-light">Steps</p>
            <h2>How It Works</h2>
            <p className="mb-4">
              Browse through a wide section of refurbished laptops from top
              brands. Follow these simple steps to find your ideal refurbished
              laptop.
            </p>
          </div>
        </div>
        {/*- Steps Wrap */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="row">
              {/* Step */}
              <div className="col-lg-4">
                <div className="text-center position-relative">
                  {/* Step Icon */}
                  <div
                    className="step-icon mx-auto border border-2 border rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 150, height: 150 }}
                  >
                    <img
                      src="/assets/about-search.svg"
                      alt="search"
                      height={50}
                      viewBox="0 0 16 16"
                      width={50}
                      loading="lazy"
                    />
                  </div>
                  <h4 className="mt-3 ">Step 1</h4>
                  <p className="text-muted mt-4 fs-4 px-lg-3 mb-5 mb-lg-0">
                    Enter your search criteria. Browse through a wide section of
                    refurbished laptops from top brands.
                  </p>
                  {/* Arrow Icon */}
                  <div
                    className="arrow-icon position-absolute d-none d-lg-block"
                    style={{ top: 50, right: "-25px" }}
                  >
                    <svg
                      className="bi bi-arrow-right"
                      height={30}
                      viewBox="0 0 16 16"
                      width={30}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Step */}
              <div className="col-lg-4">
                <div className="text-center position-relative">
                  {/* Step Icon */}
                  <div
                    className="step-icon mx-auto border border-2 border rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 150, height: 150 }}
                  >
                    <img
                      src="/assets/about-laptop.svg"
                      alt="laptop"
                      height={50}
                      viewBox="0 0 16 16"
                      width={50}
                      loading="lazy"
                    />
                  </div>
                  <h4 className="mt-3 ">Step 2</h4>
                  <p className="text-muted mt-4 fs-4 px-lg-3 mb-5 mb-lg-0">
                    Select your desired laptop model. You're one step closer to
                    finding your ideal refurbished laptop
                  </p>
                  {/* Arrow Icon */}
                  <div
                    className="arrow-icon d-none d-lg-block position-absolute"
                    style={{ top: 50, right: "-25px" }}
                  >
                    <svg
                      className="bi bi-arrow-right"
                      height={30}
                      viewBox="0 0 16 16"
                      width={30}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Step */}
              <div className="col-lg-4">
                <div className="text-center position-relative">
                  {/*- Step Icon */}
                  <div
                    className="step-icon mx-auto border border-2 border rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 150, height: 150 }}
                  >
                    <img
                      src="/assets/about-cart.svg"
                      alt="buy product"
                      height={50}
                      viewBox="0 0 16 16"
                      width={50}
                      loading="lazy"
                    />
                  </div>
                  <h4 className="mt-3 ">Step 3</h4>
                  <p className="text-muted mt-4 fs-4 px-lg-3 mb-5 mb-lg-0">
                    Select the product and connect with us on WhatsApp. Get
                    ready to enjoy your refurbished laptop!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSteps;
