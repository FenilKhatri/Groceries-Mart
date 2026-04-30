import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeletedAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Account Deleted Successfully
        </h2>
        <p className="text-gray-500 mt-2">Redirecting to home...</p>
      </div>
    </div>
  );
};

export default DeletedAccount;
