import React from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  const phoneNumber = process.env.REACT_APP_PHONE_NUMBER;
  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;

  const openWhatsApp = () => {
    const message =
      "Hello, I visited your website Kiosk Biztech and I need assistance with Available Laptops";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  const makeCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Layout title={"Contact Kiosk Biztech"}>
      <div className="bg-fade">
        <section className="py-5 my-md-5 bg-org-grad shadow">
          <div className="">
            <div
              className="carousel slide text-center text-white py-5 pointer-event"
              id="carouselExampleCaptions"
            >
              <div className="carousel-inner text-black container px-5">
                <div className="carousel-item">
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <span>Call us</span>
                      <h2 className="fw-bold display-5">Contact Us</h2>
                      <p>
                        If you have any questions or need assistance, we're here
                        to help. Call us today and explore our wide selection of
                        second-hand refurbished laptops.
                      </p>
                      <div className="d-grid col-4 mx-auto">
                        <button
                          onClick={() => makeCall()}
                          className="btn btn-outline-light bg-success"
                          href
                        >
                          Call Us
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item active">
                  <div className="row justify-content-center">
                    <div className="col-lg-6 py-1">
                      <span>Why wait?</span>
                      <h2 className="fw-bold display-5">It's Super Easy</h2>
                      <p>
                        Connect with us on WhatsApp to explore our wide
                        selection of second-hand refurbished laptops. Our team
                        is ready to assist you with all your needs.
                      </p>
                      <div className="d-grid col-4 mx-auto">
                        <button
                          onClick={() => openWhatsApp()}
                          className="btn btn-outline-light bg-success"
                          href
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev ms-3"
                data-bs-slide="prev"
                data-bs-target="#carouselExampleCaptions"
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon bg-danger p-4"
                />

                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next me-3"
                data-bs-slide="next"
                data-bs-target="#carouselExampleCaptions"
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="carousel-control-next-icon bg-danger p-4"
                />

                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="container py-5 text-center">
            <h2 className="mb-4 fw-bold">Contact Details</h2>
            <p className="mb-5 text-secondary">
              If you have any questions or need assistance, please don't
              hesitate to get in touch. We're committed to providing you with
              the support you need.
            </p>
            <div className="row g-4 mt-5 py-5">
              <div className="col-12 col-md-6">
                <div className="text-center bg-white p-2 py-4 shadow">
                  <h2 className="mb-3">Sales</h2>
                  <p className="text-secondary">
                    For corporate demo and bulk ordering call.
                  </p>
                  <p>
                    <span className="text-primary h1">{phoneNumber}</span>
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="text-center bg-white p-2 py-4 shadow">
                  <h2 className="mb-4">Support</h2>
                  <p className="text-secondary">
                    Feel free to reach out to us for refurbished laptops
                    whatsapp us
                  </p>
                  <p>
                    <span className="text-primary h1">{whatsappNumber}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex mt-5 align-item-center justify-content-center mb-5">
              <div className="text-center bg-white p-5 shadow">
                <h2 className="mb-2">Address</h2>
                <address className="px-5">
                  C-577, Ground floor, Sunday bazar road, Mahavir Enclave part
                  3, New Delhi 110059
                </address>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
