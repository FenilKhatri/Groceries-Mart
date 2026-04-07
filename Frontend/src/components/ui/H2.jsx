import React from 'react'

const H2 = ({ children, className }) => {
  return (
    <>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 ${className}`}
      >
        {children}
      </h2>
    </>
  );
}

export default H2