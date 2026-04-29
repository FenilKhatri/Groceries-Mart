import Description from "../../../shared/components/ui/Description";
import H2 from "../../../shared/components/ui/H2";

const Header = () => {
  return (
    <>
      <div className="w-full space-y-4 text-center">
        <H2 children="Contact Us" />
        <Description
          children="Have a question about your order, want to become a vendor, or just want to say hi? We're always here to help you out."
          className="mx-auto text-gray-500"
        />
      </div>
    </>
  );
};

export default Header;
