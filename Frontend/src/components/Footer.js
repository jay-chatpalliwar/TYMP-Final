import React from "react";
import logo from "../assets/logo .png"
import { NavLink } from "react-router-dom";
import {GiGraduateCap} from 'react-icons/gi'

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
        <div>
      <NavLink to={"/"} className={`-ml-8 font-bold text-2xl drop-shadow-lg flex items-center mt-8 `}><span><GiGraduateCap className='text-blue-500 text-3xl'></GiGraduateCap></span><span className='text-blue-500'>Grade</span><span className='text-slate-800'>Sarthi</span></NavLink>
      </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="# " className="hover:underline">
            GradeSarthi™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
