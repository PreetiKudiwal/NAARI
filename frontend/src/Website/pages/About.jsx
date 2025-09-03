import React from "react";
import { FaTruck, FaUndo, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

export default function About() {

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
    <div>
      <div className="bg-[url('/images/about.webp')] bg-contain lg:bg-cover lg:bg-center text-center bg-fixed">
        <h2 className="text-[2.5rem] md:text-[4rem] font-bold text-white text-center bg-black/50 py-12 md:py-24">
          About
        </h2>
      </div>

      <div className="bg-white pt-10 lg:pt-20 lg:pb-20">
        <div className="container mx-auto px-4">
          {/* Our Story */}
          <div className="flex flex-col lg:flex-row mb-16 lg:mb-36 gap-10">
            <div className="lg:w-2/3 md:w-full">
              <div className="pt-2 lg:pr-4">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 pb-4">
                  Our Story
                </h3>
                <p className="text-justify tracking-wider leading-7 me-0 lg:me-8 text-gray-600 pb-6 text-sm md:text-base">
                  At <span className="text-base md:text-lg font-semibold naari-font">
            नारी
            </span>, our journey began with a simple dream — to celebrate the timeless beauty of Indian women through outfits that blend tradition with modern elegance. <br />

India’s rich culture has always been an endless source of inspiration for us. From the intricate weaves of sarees to the graceful flow of lehengas and the comfort of salwar suits, every piece in our collection reflects the artistry, heritage, and spirit of Indian craftsmanship. <br />

We believe fashion is more than just clothing — it’s a way to express identity, confidence, and culture. That’s why our mission is to bring you outfits that honor Indian traditions while embracing the style and comfort of today’s world. <br />

What started as a small idea has now grown into a journey of trust, passion, and connection with women who cherish authenticity and elegance. Every order we deliver is not just a product, but a piece of India’s story — carefully curated to make you feel confident, graceful, and proud of your roots. <br />

Together, let’s celebrate the beauty of Indian women and the culture that inspires every outfit we create.
                </p>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-5/12 w-full mx-auto">
              <div className="border-2 border-gray-200 p-2">
                <div className="overflow-hidden h-[450px]">
                  <img
                    src="/images/redLehenga2.jpg"
                    alt="About"
                    className="w-full h-full hover:scale-105 transition duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="flex flex-col-reverse lg:flex-row gap-10">
            <div className="lg:order-2 lg:w-2/3 md:w-full mb-8 lg:mb-0">
              <div className="pt-2 lg:pl-4">
                <h3 className="text-xl md:text-2xl lg:ms-8 font-semibold text-gray-800 pb-4">
                  Our Mission
                </h3>
                <div className="text-justify lg:ms-8 text-gray-600 pb-6 tracking-wider leading-7 text-sm md:text-base">
                  At <span className="text-base md:text-lg font-semibold naari-font">
            नारी
            </span>, our mission is to empower every woman to embrace her individuality with elegance, confidence, and pride. We believe that fashion is not just about wearing clothes — it’s about carrying forward traditions, celebrating culture, and creating a style that feels authentic. <br />

Our focus is simple: <br />
<ul className="list-disc list-inside">
  <li><span className="font-bold">Preserve Heritage</span> – Keep the beauty of Indian craftsmanship alive through sarees, lehengas, suits, and more.</li>
  <li><span className="font-bold">Blend Tradition with Modernity</span> – Design outfits that honor culture while fitting today’s lifestyle.</li>
  <li><span className="font-bold">Inspire Confidence</span> – Help women feel graceful, stylish, and proud in every outfit. </li>
  <li><span className="font-bold">Commit to Quality</span> – Deliver timeless pieces crafted with love, care, and authenticity. </li>
</ul>
Every collection we create is a tribute to Indian culture and a promise to bring meaningful fashion that connects tradition with the modern spirit.
                </div>
              </div>
            </div>
            <div className="lg:order-1 lg:w-1/3 md:w-5/12 w-full mx-auto mb-8 lg:mb-0 hidden lg:block">
              <div className="border-2 border-gray-200 p-2">
                <div className="overflow-hidden h-[450px]">
                  <img
                    src="/images/newArrival6.jpg"
                    alt="Mission"
                    className="w-full h-full hover:scale-105 transition duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}
