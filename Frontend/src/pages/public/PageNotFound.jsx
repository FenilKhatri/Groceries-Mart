import PageNotFoundImg from "../../assets/background/PageNotFound.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-7xl mx-auto my-10 flex flex-col items-center justify-center gap-5">
        <img
          src={PageNotFoundImg}
          alt="page not found"
          loading="lazy"
          decoding="async"
          className="w-full h-100 object-contain"
          width="full"
          height="full"
        />
        <button
          onClick={() => navigate("/")}
          aria-label="Back"
          title="Back"
          className="px-3 py-2 text-center font-semibold bg-emerald-100 text-emerald-700 hover:bg-red-100 hover:text-red-700 transition duration-300 rounded-xl shadow-xl flex items-center gap-3 cursor-pointer"
        >
          <IoMdArrowRoundBack /> Back to Home Page
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
