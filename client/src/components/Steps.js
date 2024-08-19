import React, { useEffect, useState } from "react";

function Steps() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch("/steps.json")
      .then((response) => response.json())
      .then((data) => setSteps(data.Steps))
      .catch((error) => console.error("Error fetching the steps:", error));
  }, []);

  return (
    <section className="steps-section container pt-3 pb-5 mb-md-5 pe-0">
      <h2 className=" text-capitalize step-sec-heading fw-bold pt-5 pb-3 mb-5 px-1 text-center text-md-start unLineheading">
        Find your perfect laptops
      </h2>
      <div className="stepsbox-container row border-top border-bottom border-2">
        {steps.map((step, index) => (
          <div
            className={`stepbox col-md-4 p-5 pt-0 pt-sm-5 ${
              index === steps.length - 1 ? "" : "border-end border-2"
            }`}
            key={index}
          >
            <div className="d-flex justify-content-center mb-2">
              <img
                src={step.url}
                alt={`Step ${index + 1}`}
                className="img-fluid"
                loading="lazy"
              />
            </div>
            <h3 className="fw-semibold">{`Step ${index + 1}`}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Steps;
