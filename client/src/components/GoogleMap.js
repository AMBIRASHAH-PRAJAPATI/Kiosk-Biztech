import React from "react";

const GoogleMap = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3628.85104576251!2d80.820409!3d24.559808999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDMzJzM1LjMiTiA4MMKwNDknMTMuNSJF!5e0!3m2!1sen!2sin!4v1722680854895!5m2!1sen!2sin"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Shop Location"
    ></iframe>
  );
};

export default GoogleMap;
