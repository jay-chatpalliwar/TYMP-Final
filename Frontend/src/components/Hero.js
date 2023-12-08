import React from "react";

import hero from "../assets/hero-image-1.png"
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Student Academic Performance Evaluation Portal
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Empowering Educators, Students with Data-Driven Insights to Foster Academic Excellence, Growth, and Achievement Throughout the Learning Journey.
          </p>
          
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="inline-flex items-center justify-center mx-10 px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Sign Up
          </Link>

        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex pl-24">
          <img
            src = {hero}
            alt="mockup"
            className="w-5/6"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
