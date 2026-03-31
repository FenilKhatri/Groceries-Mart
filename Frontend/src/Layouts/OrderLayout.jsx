
import OrderBar from "../pages/user/OrderBar";
import { Outlet } from "react-router-dom";

const OrderLayout = () => {
  return (
    <>
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-6 flex flex-col space-y-5 md:space-y-10">
        <p className="font-semibold text-2xl">My Orders</p>
        <div>
          <OrderBar />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default OrderLayout;
