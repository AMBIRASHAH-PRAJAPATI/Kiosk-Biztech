import React from "react";
import Layout from "../../components/Layout/Layout";

const PrivacyPolicy = () => {
  const phoneNumber = process.env.REACT_APP_PHONE_NUMBER;
  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
  const updateDate = process.env.REACT_APP_CONDITION_UPDATE_DATE;

  return (
    <Layout title="Privacy Policy">
      <section className="bg-fade py-5 mt-md-5">
        <div className="container pt-4">
          <h1>Privacy Policy</h1>
          <p>Last updated: {updateDate}</p>
          <p>
            Welcome to Kiosk Biztech . We are committed to protecting your
            privacy and ensuring that your personal information is handled in a
            safe and responsible manner. This Privacy Policy outlines how we
            collect, use, and protect your information when you purchase
            refurbished laptops from us through WhatsApp.
          </p>
          <p>
            <strong>1. Information We Collect</strong>
            <br />
            We do not require user login or collect any personal information
            unless you purchase a product. We only collect the necessary
            information like Name, Phone Number, Address, Details of the
            purchased laptop to complete your purchase.
          </p>
          <p>
            <strong>2. How We Use Your Information</strong>
            <br />
            The information collected from the purchase will be used solely for
            transaction purposes and to contact you regarding your purchase.
          </p>
          <p>
            <strong>3. Data Retention</strong>
            <br />
            We implement appropriate technical and organizational measures to
            protect your personal data from unauthorized access, loss, or
            misuse. We only retain your data for as long as necessary to fulfill
            the purposes outlined in this Privacy Policy.
          </p>
          <p>
            <strong>4. Sharing Your Information</strong>
            <br />
            We do not share your personal information with any third parties
            except as necessary to process your order and deliver the purchased
            laptop to you (e.g., sharing your address with the courier service).
          </p>
          <p>
            <strong>5. Your Rights</strong>
            <br />
            If you have any questions or concerns about our privacy policy,
            please contact us via WhatsApp.
          </p>
          <p>
            <strong>6. Changes to This Privacy Policy </strong>
            <br />
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and the date of the latest revision
            will be indicated at the top of the page.
          </p>

          <p>
            <strong>4. Contact Us</strong>
            <br />
            If you have any questions or concerns about our privacy policy,
            please contact us via WhatsApp.
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

export default PrivacyPolicy;
