import Link from "next/link";

const Banner = () => {
    return (
      <div className="container mt-32">
        <div className="grid grid-cols-3 gap-4 pr-[15px]">
          <Link href="/workshop/SmoothieMaker">
          <div className="relative col-span-1 h-[200px] md:h-[260px] bg-[url(/product-banner-1.jpg)] bg-cover bg-center rounded-xl p-8 md:p-16
          transform transition-transform duration-200 ease-in-out hover:scale-105">
            <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
            <div className="relative z-10">
              
              <h2 className="text-white font-bold text-xl sm:text-3xl max-w-[240px]">
                Make Your Own Protein Smoothies & Snacks
              </h2>
              <p className="text-white text-xl font-medium">
                Powered by <span className="text-blue-300">MyProtein®</span>
              </p>
            </div>
          </div>
          </Link>
          <div className="relative col-span-2 h-[260px] bg-[url(/product-banner-2.jpg)] bg-cover bg-right rounded-xl transform transition-transform duration-200 ease-in-out hover:scale-105">
            <div className="absolute inset-0 bg-black opacity-10 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Banner;
  