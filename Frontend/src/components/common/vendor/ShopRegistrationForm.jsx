import { GiShop } from "react-icons/gi";
import { MdOutlineMailLock } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { FaAudioDescription } from "react-icons/fa";
import { GrCloudUpload } from "react-icons/gr";
import LazySelect from "../LazySelect";

const ShopRegistrationForm = ({
  form,
  loading,
  onChange,
  onImageChange,
  onReset,
  onSubmit,
  cityOptions,
  categoryOptions,
}) => {
  return (
    <div className="min-h-screen w-full bg-gray-100 rounded-3xl px-4">

      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white/30 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-orange-600">
                SHOP REGISTRATION
              </p>
              <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">
                Vendor Shop Form
              </h1>
              <p className="mt-1 text-sm md:text-base text-gray-500">
                Register your shop here to start selling your groceries.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-semibold text-gray-600">Secure</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              Fill shop details
            </span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
              Submit for approval
            </span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
              Start adding products
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="h-1.5 w-full bg-orange-500" />

          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                label="Shop Name"
                icon={<GiShop className="text-gray-500 shrink-0" />}
                value={form.name}
                placeholder="e.g. FreshMart Groceries"
                onChange={(e) => onChange("name", e.target.value)}
                className="md:col-span-2"
              />

              <TextAreaInput
                label="Shop Description"
                icon={<FaAudioDescription className="mt-0.5 text-gray-500 shrink-0" />}
                value={form.description}
                placeholder="Tell customers what you sell and what makes your shop special..."
                onChange={(e) => onChange("description", e.target.value)}
                className="md:col-span-2"
                note="Keep it short (1–2 lines). This will help customers trust your shop."
              />

              <TextInput
                label="Shop Email Address"
                icon={<MdOutlineMailLock className="text-gray-500 text-xl shrink-0" />}
                value={form.email}
                type="email"
                placeholder="e.g. shop@email.com"
                onChange={(e) => onChange("email", e.target.value)}
                className="md:col-span-2"
                note="We’ll use this email for verification & admin communication."
              />

              <TextInput
                label="Shop Contact Number"
                icon={<BiSolidContact className="text-gray-500 shrink-0" />}
                value={form.phone}
                type="tel"
                placeholder="e.g. 9876543210"
                onChange={(e) =>
                  onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
              />

              <SelectField
                label="Category"
                value={form.category}
                options={categoryOptions}
                onChange={(opts) => onChange("category", opts || [])}
                placeholder="Select categories..."
                isSearchable
                isMulti
                closeMenuOnSelect={false}
              />

              <TextAreaInput
                label="Shop Address"
                icon={<FaAudioDescription className="mt-0.5 text-gray-500 shrink-0" />}
                value={form.address}
                placeholder="Street / Area / Landmark"
                onChange={(e) => onChange("address", e.target.value)}
                className="md:col-span-2"
              />

              <SelectField
                label="City"
                value={form.city}
                options={cityOptions}
                onChange={(value) => onChange("city", value)}
                placeholder="Search & select city..."
                isSearchable
              />

              <PlainInput
                label="Pincode"
                value={form.pincode}
                placeholder="6-digit pincode"
                onChange={(e) => onChange("pincode", e.target.value)}
                maxLength={6}
                note="Example: 395007"
              />

              <ImageUpload
                image={form.image}
                onChange={onImageChange}
                className="md:col-span-2"
              />
            </div>

            <div className="my-7 h-px w-full bg-gray-200" />

            <div className="md:col-span-2 flex justify-center items-center gap-5">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-2xl py-4 px-3 font-semibold text-white shadow-sm transition duration-300 ${
                  loading
                    ? "bg-orange-400 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 cursor-pointer"
                }`}
              >
                {loading ? "Registering your shop..." : "Register your shop"}
              </button>

              <button
                type="button"
                onClick={onReset}
                disabled={loading}
                className={`rounded-2xl py-4 px-3 font-semibold text-white shadow-sm transition ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                Reset
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-500">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const FieldWrapper = ({ label, children, className = "", note }) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-gray-800">{label}</label>
    {children}
    {note ? <p className="mt-2 text-xs text-gray-500">{note}</p> : null}
  </div>
);

const TextInput = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  note,
}) => (
  <FieldWrapper label={label} className={className} note={note}>
    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100 transition">
      {icon}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
      />
    </div>
  </FieldWrapper>
);

const TextAreaInput = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  className = "",
  note,
}) => (
  <FieldWrapper label={label} className={className} note={note}>
    <div className="mt-2 flex items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100 transition">
      {icon}
      <textarea
        rows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
      />
    </div>
  </FieldWrapper>
);

const PlainInput = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  note,
}) => (
  <FieldWrapper label={label} note={note}>
    <div className="mt-2 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100 transition">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
      />
    </div>
  </FieldWrapper>
);

const SelectField = ({
  label,
  value,
  options,
  onChange,
  placeholder,
  isSearchable,
  isMulti = false,
  closeMenuOnSelect = true,
}) => (
  <FieldWrapper label={label}>
    <div className="mt-2 rounded-2xl border border-gray-200 bg-white px-2 py-2 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100 transition">
      <LazySelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
        classNamePrefix="rs"
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            minHeight: "44px",
          }),
        }}
      />
    </div>
  </FieldWrapper>
);

const ImageUpload = ({ image, onChange, className = "" }) => (
  <FieldWrapper label="Shop Image" className={className}>
    <label
      htmlFor="shopImage"
      className="mt-2 group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center transition hover:border-orange-300 hover:bg-orange-50/40 overflow-hidden"
      title="Click to change image"
    >
      <input
        id="shopImage"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
        onClick={(e) => (e.target.value = null)}
      />

      {image ? (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-2xl object-cover"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
            <span className="rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
              Click to change
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <GrCloudUpload className="h-8 w-8 text-gray-700 group-hover:text-orange-600" />
          </div>

          <p className="mt-4 text-base font-semibold text-gray-900">
            Upload shop image
          </p>
          <p className="mt-1 text-sm text-gray-500">
            PNG, JPG up to 5MB • Click to browse
          </p>
        </>
      )}
    </label>
  </FieldWrapper>
);

export default ShopRegistrationForm;