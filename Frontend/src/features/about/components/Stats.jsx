import { stats } from "../../../data/pages/aboutData";

const Stats = () => {
  return (
    <>
      <section className="bg-emerald-500 text-white rounded-3xl px-6 py-10 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats?.map((stat, index) => (
            <div className="space-y-2" key={index}>
              <p className="text-4xl md:text-5xl font-bold">{stat?.count}</p>
              <p className="text-sm md:text-base font-medium text-white/90">
                {stat?.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Stats