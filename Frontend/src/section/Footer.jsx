import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-center py-20 mt-32 w-full  animate-on-scroll">
      <div className="max-w-6xl mx-auto px-4 h-7">
        <div className="flex justify-center space-x-6 mb-4">
          {[
            {
              icon: <FaFacebook className="w-6 h-6" />,
              url: "https://facebook.com",
            },
            {
              icon: <FaGithub className="w-6 h-6" />,
              url: "https://github.com",
            },
            {
              icon: <FaLinkedin className="w-6 h-6" />,
              url: "https://linkedin.com",
            },
            {
              icon: <FaTwitter className="w-6 h-6" />,
              url: "https://twitter.com",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-all hover:scale-125"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="text-gray-400 text-sm mb-4">
          &copy; {new Date().getFullYear()} Aventor. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          {["Privacy Policy", "Terms of Service", "Contact Us", "About"].map(
            (item) => (
              <span
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-blue-400 transition-colors hover:underline"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
