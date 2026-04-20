import cityName from "../../data/cityName";
import Select from "react-select";

const ShippingAddress = ({ address, handleAddress }) => {
  const cityOptions = cityName?.map((city) => ({
    label: city,
    value: city,
  }));

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 md:px-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Shipping Address
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Choose the address where you want your order delivered.
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name {" * "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            value={address.name}
            onChange={handleAddress}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none wrap-break-word"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number {" * "}
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={address.phone}
            onChange={handleAddress}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Full Address {" * "}
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="House number, street, area..."
            rows="3"
            value={address.address}
            onChange={handleAddress}
            className="resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">
              City{" * "}
            </label>
            <Select
              options={cityOptions}
              placeholder="Select city"
              value={cityOptions.find((c) => c.value === address.city) || null}
              onChange={(selectedOption) =>
                handleAddress({
                  target: {
                    name: "city",
                    value: selectedOption?.value || "",
                  },
                })
              }
              isSearchable
              className="text-sm"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderRadius: "6px",
                  borderColor: state.isFocused ? "#10b981" : "#d1d5db",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px rgba(16,185,129,0.2)"
                    : "none",
                  "&:hover": {
                    borderColor: "#10b981",
                  },
                  minHeight: "38px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="pincode"
              className="text-sm font-medium text-gray-700"
            >
              Pincode{" * "}
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleAddress}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 p-5 md:p-6">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="customerNote"
            className="text-sm font-medium text-gray-700"
          >
            Customer Note
          </label>
          <textarea
            id="customerNote"
            name="customerNote"
            placeholder="Enter your note..."
            rows="3"
            value={address.customerNote}
            onChange={handleAddress}
            className="resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
