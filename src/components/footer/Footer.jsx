

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-white/90 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-8 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between gap-6">

          {/* Logo + copyright */}
          <div className="flex flex-col items-start w-full sm:w-auto">
            <Logo  />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              &copy; 2026 DevUI. All Rights Reserved.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full sm:w-auto">
            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-2">
                Company
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Affiliate
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-2">
                Support
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Help
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legals */}
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-2">
                Legals
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-600 transition">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="mt-6 flex justify-center space-x-4 text-gray-400 dark:text-gray-500 text-lg">
          <a href="#" aria-label="Twitter" className="hover:text-blue-500 transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-gray-800 dark:hover:text-white transition">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
