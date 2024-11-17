"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ParticlesComponent from "../components/Particles/ParticlesBackground";

const Page = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <main className="relative h-screen w-screen bg-black overflow-hidden flex items-center justify-center">
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-transform duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(207,8,140,0.07), 
            rgba(147,51,234,0.07) 20%,
            transparent 40%)`,
        }}
      />

      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                         linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className=" sm:text-[20vh] md:text-[25vh] font-bold leading-none select-none">
            <span className="text-transparent text-[50px] bg-clip-text bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 blur-2xl absolute inset-0 animate-pulse">
              404
            </span>
            <span className="text-transparent text-[80px] bg-clip-text bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 relative">
              404
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6 max-w-2xl mx-auto text-center mt-8 flex flex-col "
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase text-white/90">
            Lost in the digital void?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg px-4">
            The page you&apos;re looking for has vanished into the digital ether.
            Don&apos;t worry though, our homepage is just a click away.
          </p>

          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[rgba(207,8,140,1)] to-purple-600 rounded-xl text-white font-medium group relative overflow-hidden"
            >
              <span className="relative z-10">Return to Homepage</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-[#db259e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex gap-4 sm:gap-6 text-sm text-gray-500"
        >
          {["Help Center", "Contact Us", "Report Issue"].map((link, index) => (
            <Link
              key={index}
              href="#"
              className="hover:text-[rgba(207,8,140,1)] transition-colors duration-300"
            >
              {link}
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -100, null],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-[rgba(241,236,239,0.86)] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <ParticlesComponent />
    </main>
  );
};

export default Page;
