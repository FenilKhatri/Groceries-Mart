import React from 'react'

const Description = ({ children, className }) => {
  return (
    <>
      <p
        className={`max-w-2xl text-sm md:text-base font-medium ${className}`}
      >
        {children}
      </p>
    </>
  );
}

export default Description