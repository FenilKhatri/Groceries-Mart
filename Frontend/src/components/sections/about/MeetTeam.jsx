const MeetFounder = () => {
  return (
    <section className="md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* RIGHT - CONTENT */}
        <div>
          {/* Small Label */}
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
            Founder
          </p>

          {/* Name */}
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Fenil Khatri
          </h2>

          {/* Statement */}
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            I built FreshMart to simplify how people shop for groceries — making
            it faster, more reliable, and accessible to everyone.
          </p>

          {/* Secondary Text */}
          <p className="text-gray-500 leading-relaxed mb-8">
            As a full stack developer, I focus on creating real-world products
            that solve everyday problems. FreshMart connects local vendors with
            customers through a seamless digital experience.
          </p>

          {/* Minimal Divider */}
          <div className="w-12 h-0.5 bg-gray-200 mb-6"></div>

          {/* Tech Stack */}
          <p className="text-sm text-gray-400">
            MERN • Razorpay • JWT • Cloud Deployment
          </p>
        </div>
      </div>
    </section>
  );
};

export default MeetFounder;
