import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 md:flex  md:justify-between gap-8">
        
        <div className="md:w-[35%]">
          <h2 className="text-3xl font-extrabold text-blue-500">日本語 Learn</h2>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Expand your Japanese vocabulary with interactive lessons and
            tutorials. Learn at your own pace and master the language today!
          </p>
        </div>

  
        <div>
          <h3 className="text-lg font-semibold text-blue-400 pt-8 md:pt-0">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-blue-400 transition duration-200"
              >
                Lessons
              </a>
            </li>
            <li>
              <a
                href="/tutorials"
                className="text-gray-300 hover:text-blue-400 transition duration-200"
              >
                Tutorials
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="text-gray-300 hover:text-blue-400 transition duration-200"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="text-gray-300 hover:text-blue-400 transition duration-200"
              >
                Register
              </a>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold text-blue-400 pt-8 md:pt-0">Contact Us</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:tazahmedsoft@gmail.com"
                className="text-gray-300 hover:text-blue-400 transition duration-200"
              >
                support@tihan-learn.com
              </a>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="text-gray-300 hover:text-blue-400 transition duration-200"
              >
                +880 1234 56782 
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <a
              href="https://www.facebook.com/tazahmedcse/"
              className="text-gray-400 hover:text-blue-400 transition duration-200 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/home"
              className="text-gray-400 hover:text-blue-400 transition duration-200 text-xl"
            >
              <RiTwitterXLine />
            </a>
            <a
              href="https://www.linkedin.com/in/shaiktazuddin/"
              className="text-gray-400 hover:text-blue-400 transition duration-200 text-xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} 日本語 Learn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
