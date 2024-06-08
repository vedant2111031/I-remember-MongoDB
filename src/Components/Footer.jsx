import React from "react";

const Footer = () => {
  return (
    <div className="bg-blue-100 flex flex-col justify-center items-center sticky py-3 bottom-0 w-full">
      <div>
        <span className="text-blue-400 text-xl font-bold">I-</span>
        <span className="text-blue-600 text-xl font-bold">rem</span>
        <span className="text-blue-800 text-xl font-bold">ember</span>
      </div>
     <p className="text-center text-blue-500 text-xl">A simplified and secure password manager.</p> 
    </div>
  );
};

export default Footer;
