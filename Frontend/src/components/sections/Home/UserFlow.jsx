import { userFlow } from "../../../data/pages/home";

const UserFlow = () => {
  return (
    <section className="py-20 bg-linear-to-b from-white to-green-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Your journey from browsing to delivery.
          </p>
        </div>

        {/*  MOBILE VIEW  */}
        <div className="flex flex-col gap-6 md:hidden">
          {userFlow.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex gap-4 items-start bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                {/* Dot */}
                <div className="w-3 h-3 mt-2 bg-green-600 rounded-full"></div>

                {/* Content */}
                <div>
                  <Icon className="text-green-600 text-lg mb-1" />
                  <h4 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/*  DESKTOP VIEW  */}
        <div className="relative hidden md:block">
          {/* SVG Path */}
          <svg viewBox="0 0 1000 300" className="w-full h-75">
            <path
              d="M 50 200 Q 250 40 500 150 T 950 120"
              stroke="#10b981"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8 8"
            />
          </svg>

          {/* Steps */}
          {userFlow.map((item, index) => {
            const Icon = item.icon;

            const positions = [
              { top: "65%", left: "0%" },
              { top: "25%", left: "25%" },
              { top: "55%", left: "50%" },
              { top: "30%", left: "75%" },
              { top: "55%", left: "100%" },
            ];

            const pos = positions[index];

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-[60%] group"
                style={{ top: pos.top, left: pos.left }}
              >
                {/* Dot */}
                <div className="w-4 h-4 bg-green-600 rounded-full mb-2 mx-auto shadow"></div>

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 shadow-md w-44 text-center group-hover:shadow-lg transition">
                  <Icon className="text-green-600 text-xl mx-auto mb-1" />

                  <h4 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserFlow;
