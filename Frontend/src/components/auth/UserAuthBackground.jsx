import LoginRegisterBG from "../../assets//background/LoginRegisterBG.png";

const UserAuthBackground = () => {
  return (
    <div className="relative hidden h-screen lg:block">
      <img
        src={LoginRegisterBG}
        alt="User auth background"
        loading="lazy"
        decoding="async"
        width="full"
        height="full"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

      <div className="absolute bottom-12 left-10 right-10 text-white">
        <span className="rounded-full border border-white/30 px-4 py-2 text-xs backdrop-blur">
          CUSTOMER STORY
        </span>

        <h2 className="mt-6 text-3xl font-bold leading-snug">
          "Fresh groceries from trusted local vendors, delivered right to our
          doorstep. Shopping has never been this easy and reliable."
        </h2>

        <div className="mt-6">
          <p className="font-semibold">Happy FreshMart Customer</p>
          <p className="text-sm text-white/70">
            Fast delivery • Fresh products
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuthBackground;