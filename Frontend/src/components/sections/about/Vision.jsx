const Vision = () => {
  return (
    <section className="relative bg-linear-to-b from-white to-green-50 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-87.5 h-87.5 bg-green-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-green-100 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT - GLASS FUTURE CARD */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 text-center">
            {/* Big Number */}
            <h3 className="text-5xl font-extrabold text-green-600 mb-2">
              100K+
            </h3>
            <p className="text-gray-500 mb-6">Customers Goal</p>

            {/* Divider */}
            <div className="w-10 h-1 bg-green-500 mx-auto mb-6 rounded"></div>

            {/* Small Vision Points */}
            <p className="text-gray-600 leading-relaxed">
              Expanding across cities, empowering local vendors, and making
              grocery delivery faster, smarter, and more reliable for everyone.
            </p>
          </div>
        </div>

        {/* RIGHT - TEXT */}
        <div>
          <p className="text-sm uppercase tracking-widest text-green-600 mb-4">
            Our Vision
          </p>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Building India’s Most <br />
            <span className="text-green-600">Trusted Grocery Platform</span>
          </h2>

          <p className="text-gray-500 mt-6 text-lg max-w-md">
            We envision a future where every household can access fresh,
            affordable groceries with just a few clicks, powered by a strong
            network of local vendors and smart technology.
          </p>

          {/* Subtle Line */}
          <div className="mt-8 w-16 h-1 bg-green-500 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
