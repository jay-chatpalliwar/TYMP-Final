import React from 'react';
// import { TailwindProvider } from 'tailwindcss-react';
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    // <TailwindProvider>
      <div className="container mx-auto px-4 mt-8 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-500 mb-8">Please fill out the form below to contact us.</p>
        <ContactForm />
      </div>
    // </TailwindProvider>
  );
};

export default ContactPage;
