import React from "react";
import Layout from "../../components/Layout/Layout";

const TermsAndConditions = () => {
  const phoneNumber = process.env.REACT_APP_PHONE_NUMBER;
  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
  const updateDate = process.env.REACT_APP_CONDITION_UPDATE_DATE;
  return (
    <Layout title="Terms and Conditions">
      <section className="bg-fade py-5 mt-md-5">
        <div className="container pt-4">
          <h1>Terms and Conditions</h1>
          <p>Last updated: {updateDate}</p>
          <p>
            Welcome to Kiosk Biztech. By using our website, you agree to comply
            with and be bound by the following terms and conditions.
          </p>
          <p>
            <strong>1. General </strong>
            <br />
            General By placing an order with us, you agree to be bound by these
            Terms and Conditions. If you do not agree with any part of these
            terms, you should not place an order with us.
          </p>
          <p>
            <strong>2. Products</strong>
            <br />
            We sell second-hand refurbished laptops. All products are sold
            "as-is" with no warranties or guarantees of any kind. We make every
            effort to describe and display our products accurately. However, we
            do not guarantee that the descriptions, colors, or other content
            available on our website are accurate, complete, reliable, current,
            or error-free.
          </p>
          <p>
            <strong>3. Purchase Process</strong>
            <br />
            Purchases are made directly through WhatsApp/call and shope. We will
            collect the necessary information to complete your purchase and
            arrange for the delivery of the product.
          </p>
          <p>
            <strong>4. No Return Policy</strong>
            <br />
            All sales are final. We do not accept returns or exchanges for any
            reason. Please make sure to review the product details and
            specifications carefully before making a purchase.
          </p>
          <p>
            <strong>5. Ordering and Payment</strong>
            <br />
            Orders can be placed directly through WhatsApp. Once an order is
            placed, you will receive a confirmation message with payment
            instructions. Payment must be made in full before the product is
            shipped.
          </p>

          <p>
            <strong>6. Contact Us</strong>
            <br />
            If you have any questions about these Terms and Conditions, please
            contact us at:
            <br />
            <br />
            <strong> Kiosk Biztech</strong>
            <br />
            <strong> Contact Us </strong>
            <span className="text-bg-warning ms-3">{phoneNumber}</span>
            <br />
            <strong> Whatsapp Us </strong>
            <span className="text-bg-warning ms-3">{whatsappNumber}</span>
            <br />
            <address>
              <strong> Address- </strong>
              C-577, Ground floor, Sunday bazar road, Mahavir Enclave part 3,
              New Delhi 110059
            </address>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default TermsAndConditions;
