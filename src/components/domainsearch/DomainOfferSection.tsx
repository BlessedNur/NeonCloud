"use client";
import { Search, Timer, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const DomainOfferSection = () => {
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector("input").value;
    if (searchInput) {
      router.push(`/domain?search=${encodeURIComponent(searchInput)}`);
    }
  };
  return (
    <div className="relative overflow-hidden z-[2]">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl" />

      <div className="bg-white/5 backdrop-blur-xl mt-16 shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />

        <div className="relative max-w-[1270px] m-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-4 lg:max-w-[50%]">
              <div className="flex items-center gap-2 mb-2">
                <div className="animate-pulse">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-yellow-400 font-medium text-sm">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="text-4xl font-bold text-center lg:text-left">
                <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                  Get 10% Off Today
                </span>
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-center lg:text-left">
                  <Timer className="w-4 h-4 text-purple-400 hidden lg:block" />
                  <p className="text-gray-300">
                    Grab the holiday Offer. This will end in 3 days.
                    <span className="text-white font-medium ml-1 inline-flex items-center">
                      Hurry Up!
                      <span className="animate-bounce ml-1">🎉</span>
                    </span>
                  </p>
                </div>

                <p className="text-gray-300 text-center lg:text-left">
                  Get your perfect domain from
                  <span className="text-white font-semibold ml-1">$148/Mo</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 w-full lg:w-auto">
              <div className="group relative">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-xl w-full lg:w-fit p-3 pl-4 rounded-xl border border-white/10 shadow-xl transition-all duration-300 hover:border-purple-500/30"
                >
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    className="bg-transparent w-full lg:w-[22em] outline-none placeholder-gray-400 text-white"
                    placeholder="Type Your Domain Name"
                  />
                  <span className="font-medium text-sm whitespace-nowrap text-gray-300 px-3 border-l border-gray-700">
                    .neoncloudd.com
                  </span>
                  <button
                    type="submit"
                    className="relative px-7 py-3 rounded-lg group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r rounded-lg from-purple-600 to-blue-600 transition-all duration-300 group-hover:scale-105" />
                    <span className="relative text-white font-medium flex items-center gap-2">
                      Search
                    </span>
                  </button>
                </form>
              </div>

              <div className="text-center lg:text-right space-y-1">
                <p className="text-gray-400 text-sm">
                  Only sub-domains are available at the moment -
                  <span className="text-white font-medium ml-1">
                    tune in for upcoming updates!
                  </span>
                </p>
                <p className="text-purple-400 text-xs">
                  Premium domains coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainOfferSection;
