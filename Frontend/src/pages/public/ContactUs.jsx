import { Header, ContactInfo, Form, FAQs, Map } from "../../features/contact/components/index";

const ContactUs = () => {

  return (
    <section className="bg-gray-50 py-10 md:py-16">
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-10 space-y-10">
        {/* Contact Support + Form */}
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ContactInfo />
          <Form />
        </div>
        <FAQs />
        {/* Map */}
        <div className="space-y-6">
          <Map />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
