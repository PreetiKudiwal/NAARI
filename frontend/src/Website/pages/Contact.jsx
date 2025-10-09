import React, { useContext, useState } from "react";
import { FaTruck, FaUndo, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MainContext } from "../../context/Context";

export default function Contact() { 
  const { toastNotify } = useContext(MainContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const [wordCount, setWordCount] = useState(0);

const handleMessageChange = (e) => {
  const words = e.target.value.trim().split(/\s+/);

  if (words.length <= 50) {
    setMessage(e.target.value);
    setWordCount(words.filter(Boolean).length); // remove empty words
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({name, email, message});
    toastNotify("Message sent successfully!",1);
    setName("");
    setEmail("");
    setMessage("");
    setWordCount(0);
  };

  const features = [
    {
      icon: <FaRegHeart className="text-xl mb-3 color" />,
      title: "MADE IN INDIA",
      desc: "Our products are truly Made in India",
    },
    {
      icon: <FaTruck className="text-xl mb-3 color" />,
      title: "FREE DELIVERY",
      desc: "Enjoy free delivery on all orders",
    },
    {
      icon: <FaUndo className="text-xl mb-3 color" />,
      title: "EASY RETURNS",
      desc: "Shop with confidence, enjoy easy returns",
    },
    {
      icon: <FaHeadset className="text-xl mb-3 color" />,
      title: "TOP-NOTCH SUPPORT",
      desc: "Experience best support, ensuring your satisfaction",
    },
    {
      icon: <FaShieldAlt className="text-xl mb-3 color" />,
      title: "SECURE PAYMENTS",
      desc: "Shop securely with our trusted payment options",
    },
  ];

  return (
    <>
      {/* Title Section */}
      <div className="bg-[url('https://res.cloudinary.com/dbglxb4z0/image/upload/v1760000144/about_neja4z.jpg')] bg-contain lg:bg-cover lg:bg-center text-center bg-fixed">
        <h2 className="text-[2.5rem] md:text-[4rem] font-bold text-white text-center bg-black/50 py-12 md:py-24">
          Contact
        </h2>
      </div>

      {/* Content Section */}
      <div className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Contact Details */}
          <div className="border p-8 flex flex-col max-w-3xl mx-auto gap-10 text-sm color">
            {/* Address */}
            <div className="flex gap-4">
              <div>
                <h5 className="font-semibold">CORPORATE OFFICE</h5>
                <p className="mt-2">
                  <span className="text-sm font-semibold naari-font">
                    नारी
                  </span>{" "}
                  Store, 3rd Floor, Arcade Tower, C-Scheme, Jaipur, RJ 302001 IN
                </p>
              </div>
            </div>

            {/* Phone */}
              <div>
                <h5 className="font-semibold">CUSTOMER SUPPORT:</h5>
                <p className="mt-2">+91 840 123 6879</p>
              </div>

            {/* Email */}
              <div>
                <h5 className="font-semibold">E-MAIL:</h5>
                <p className="mt-2">support@bynaari.com</p>
              </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-2 flex gap-6">
                <div className="w-1/2">
                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 focus:outline-none  focus:border-black py-3  px-4 text-gray-700 placeholder-gray-400"
                />
                </div>
                 
                 <div className="w-1/2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 focus:outline-none  focus:border-black py-3 px-4 text-gray-700 placeholder-gray-400"
                />
                </div>
                
              </div>
              

              <div className="mb-6">
                <textarea
                  name="msg"
                  placeholder="Message"
                  value={message}
                  onChange={handleMessageChange}
                  required
                  className="w-full border border-gray-300p-4 h-40 resize-none px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black"
                ></textarea>
                 <p className="text-xs text-gray-500 mt-1">
    {wordCount} / 50 words
  </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 font-medium hover:bg-gray-900 transition duration-300"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[450px]">
  <iframe
    title="Jaipur Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5149377071984!2d75.7938!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3f8c1e4c54f%3A0xb77bdf7db4d1c91d!2sC-Scheme%2C%20Ashok%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302001!5e0!3m2!1sen!2sin!4v1692871200000!5m2!1sen!2sin"
    className="w-full h-full border-0"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

      <div className="w-full  py-14 mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 text-center border-t">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {feature.icon}
            <h3 className="text-xs font-bold uppercase tracking-wide color">
              {feature.title}
            </h3>
            <p className="color text-xs mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
