"use client";

import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-black mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Welcome to Mood Catcher{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Mood Logging",
                1000,
                "Diary Tracking",
                1000,
                "Goal Setting",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#adb7be] text-base sm:text-lg mb-6 lg:text-xl">
            Your Ultimate Self-Care Companion. Track your moods, set meaningful goals, and reflect on your journey towards better mental health. All in one intuitive app.
          </p>
          <Link href={user ? "/add-entry" : "/auth"}>
            <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:bg-slate-200 text-white">
              Start tracking today!
            </button>
          </Link>
          <Link href="mailto:danblock1997@hotmail.co.uk">
            <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:bg-slate-800 text-white mt-3">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Get Fast Support!
              </span>
            </button>
          </Link>
        </div>
        <div className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] relative">
            <Image
              src="/logo.webp"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-transparent"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
