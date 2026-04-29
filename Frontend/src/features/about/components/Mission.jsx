const Mission = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-100 h-100 bg-green-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-75 h-75 bg-green-100 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT - BIG STATEMENT */}
        <div>
          <p className="text-sm uppercase tracking-widest text-green-600 mb-4">
            Our Mission
          </p>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Reinventing the Way You Buy Groceries <br />
            <span className="text-green-600">Online</span>
          </h2>

          <p className="text-gray-500 mt-6 text-lg max-w-md">
            We are building a seamless ecosystem where freshness, speed, and
            trust come together to deliver the best grocery experience.
          </p>
        </div>

        {/* RIGHT - GLASS CARD */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our mission is to empower local vendors while providing customers
              with access to high-quality groceries through a fast, reliable,
              and intuitive digital platform.
            </p>

            {/* Divider */}
            <div className="w-12 h-1 bg-green-500 mb-6 rounded"></div>

            {/* Key Points */}
            <ul className="space-y-3 text-gray-600">
              <li>• Faster delivery experience</li>
              <li>• Trusted & verified vendors</li>
              <li>• Fresh and quality products</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
