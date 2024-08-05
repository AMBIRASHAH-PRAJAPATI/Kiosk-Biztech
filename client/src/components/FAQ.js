import React, { useEffect, useState } from "react";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("/json/faq.json")
      .then((response) => response.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="row justify-content-center text-center mb-3">
          <div className="col-lg-8 col-xl-7">
            <span className="text-muted">F.A.Q</span>
            <h2 className="text-capitalize display-5 fw-bold mb-5">
              Frequently Asked Questions
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row g-4 g-md-5">
              {faqs.map((faq, index) => (
                <div className="col-lg-6" key={index}>
                  <div className="d-flex">
                    <div className="text-primary me-4">
                      <svg
                        className="bi bi-question-circle-fill text-danger"
                        fill="currentColor"
                        height={32}
                        viewBox="0 0 16 16"
                        width={32}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-2 mb-lg-4 fw-bold">{faq.question}</h4>
                      <p className="fs-4">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
