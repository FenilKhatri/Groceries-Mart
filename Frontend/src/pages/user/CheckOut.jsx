import { useEffect, useState } from "react";
import { deleteCart, userCart } from "../../api/userApi";
import { toast } from "react-toastify";
import { createRazorPayOrder, verifyRazorPayOrder } from "../../api/paymentApi";
import { useNavigate } from "react-router-dom";
import ShippingAddress from "../../components/checkout/ShippingAddress";
import OrderSummary from "../../components/checkout/OrderSummary";

const CheckOut = () => {
  const [items, setItems] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    customerNote: "",
  });

  const navigate = useNavigate();

  // Validate fields
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Load checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );

      if (existingScript) {
        return resolve(true);
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleItems = async () => {
    try {
      const res = await userCart();
      setItems(res.cart);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch cart!");
    }
  };

  const handlePayment = async () => {
    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.address.trim() ||
      !address.city.trim() ||
      !address.pincode.trim()
    ) {
      return toast.error("Please fill all address fields!");
    }

    const phoneRegEx = /^\d{10}$/;
    if (!phoneRegEx.test(address.phone)) {
      return toast.error("Invalid phone number!");
    }

    const pincodeRegEx = /^\d{6}$/;
    if (!pincodeRegEx.test(address.pincode)) {
      return toast.error("Invalid pincode!");
    }

    const confirmOrder = window.confirm(
      "Please verify details and Are you sure you want to place order?",
    );
    if (!confirmOrder) return;

    try {
      const script = await loadRazorpayScript();
      if (!script) {
        return toast.error("RazorPay error!");
      }

      const data = await createRazorPayOrder();
      const { order, key, currency } = data;

      const options = {
        key,
        amount: order.amount,
        currency: currency || "INR",
        name: "Green Leaf Grocers",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await verifyRazorPayOrder({
              ...response,
              ...address,
            });
            await deleteCart();
            toast.success(verifyRes?.message || "Payment successful!");

            navigate("/users/orders");
          } catch (error) {
            toast.error(error?.message || "Verification failed");
          }
        },

        prefill: {
          name: address.name,
          email: "test@example.com",
          contact: address.phone,
        },

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        theme: { color: "#10b981" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error?.message || "Unable to start payment");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleItems();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <p className="text-sm font-medium text-emerald-600 tracking-wide uppercase">
            Secure Checkout
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-800">
            Checkout
          </h2>
          <p className="mt-2 text-slate-500 text-sm md:text-base">
            Review your shipping details and order summary before placing your
            order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-3">
            <ShippingAddress address={address} handleAddress={handleAddress} />
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2">
            <OrderSummary items={items} handlePayment={handlePayment} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
