const H3 = ({ children, className }) => {
  return (
    <>
      <h3
        className={`text-2xl md:text-3xl font-bold ${className}`}
      >
        {children}
      </h3>
    </>
  );
}

export default H3