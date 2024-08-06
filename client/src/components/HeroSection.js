import React from "react";

const HeroSection = () => {
  const openWhatsApp = () => {
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
    const message =
      "Hello, I visited your website Kiosk Biztech and I need assistance with Available Laptops";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  const makeCall = () => {
    const phoneNumber = process.env.REACT_APP_PHONE_NUMBER;
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div
      id="hero"
      className="bg-org d-flex justify-content-center align-items-center"
    >
      <div className="contentbox text-center py-5 container">
        <h1
          className="text-capitalize heroheading my-5 fw-bolder lh-base"
          data-aos="zoom-in"
        >
          Delivering high Quality refurbished laptops at{" "}
          <span className="bg-warning text-dark px-1 rounded text-nowrap">
            Lowest prices !
          </span>{" "}
        </h1>
        <p
          className="heropara my-5 text-body-secondary px-5"
          data-aos="zoom-in"
        >
          Shop offering a wide range of quality, refurbished laptops at
          competitive prices. Specializes in providing top-notch customer
          service and technical support.
        </p>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <button
            type="button"
            className="btn btn-success m-3 p-4"
            onClick={openWhatsApp}
          >
            WhatsApp
          </button>
          <button
            type="button"
            className="btn btn-outline-warning m-3 p-4"
            onClick={makeCall}
          >
            Make a Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
