import Description from "../../ui/Description";
import H3 from "../../ui/H3";

const Map = () => {
  return (
    <>
      <div className="text-center space-y-3">
        <H3 children="Find Us On The Map" className="text-black" />
        <Description
          children="Visit our office or pickup location. We're located in Surat and always
          happy to meet our customers."
          className="mx-auto text-gray-500"
        />
      </div>

      <div className="w-full bg-white border border-gray-200 shadow-md rounded-3xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1788429504836!2d72.83192997511073!3d21.22475558047407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ee9ed6dd4d7%3A0x83a13a1e8bda8c9a!2sSanskar%20Villa%20Apartment!5e0!3m2!1sen!2sin!4v1773394775195!5m2!1sen!2sin"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full h-50 md:h-150 rounded-2xl"
        ></iframe>
      </div>
    </>
  );
};

export default Map;
