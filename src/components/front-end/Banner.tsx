"use client"

import Link from "next/link";

const Banner = () => {
    return (
      <div className="container mt-32 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/workshop/SmoothieMaker" className="relative block h-[200px] md:h-[260px] bg-[url(/product-banner-1.jpg)] bg-cover bg-center rounded-xl p-4 md:p-8 lg:p-16
            transform transition-transform duration-200 ease-in-out hover:scale-105">
            <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
            <div className="relative z-10">
              <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-full sm:max-w-[240px] md:max-w-[320px]">
                Make Your Own Protein Smoothies & Snacks
              </h2>
              <p className="text-white text-base md:text-xl font-medium">
                Powered by <span className="text-blue-300">MyProtein®</span>
              </p>
            </div>
          </Link>
          <Link href="/products" className="relative block h-[200px] md:h-[260px] md:col-span-2 bg-[url(/product-banner-2.jpg)] bg-cover bg-right rounded-xl transform transition-transform duration-200 ease-in-out hover:scale-105">
            <div className="absolute inset-0 bg-black opacity-10 rounded-xl"></div>
          </Link>
        </div>
      </div>
    );
};

export default Banner;
