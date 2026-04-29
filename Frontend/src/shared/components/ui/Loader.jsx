const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 transition-opacity duration-500">
      {/* Video */}
      <video
        className="w-72 h-72 object-contain pointer-events-none select-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/loader.mp4" type="video/mp4" />
      </video>

      {/* Text */}
      <p className="mt-2 text-lg font-medium text-emerald-500 tracking-wide animate-pulse">
        Loading <span className="text-orange-500">...</span>
      </p>
    </div>
  );
};

export default Loader;
