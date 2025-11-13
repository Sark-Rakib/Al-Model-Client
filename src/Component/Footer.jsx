import React from "react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div data-aos="fade-up">
      <footer className=" bg-gray-900 text-gray-300 py-10 px-6 md:px-20 mt-16 fixed min-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              AI Model Hub
            </h2>
            <p className="text-sm leading-relaxed">
              Explore and manage pre-trained AI models for NLP, vision, and
              generative tasks. Empower your projects with the latest in machine
              learning innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/models" className="hover:text-white duration-200">
                  Models
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-lg">
              <a
                href="https://www.facebook.com/sarkrakib/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/Sark-Rakib"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-100"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} AI Model Hub — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
