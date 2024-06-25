"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import moodSelect from '../../public/mood-select.png';
import activitiesSelect from '../../public/activities-select.png';
import trackLife from '../../public/track-life.png';
import logo from '../../public/logo.webp'; // Importing logo

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col items-center">
      <Image src={logo} alt="Mood Catcher Logo" width={120} height={120} className="mb-6 animate__animated animate__fadeInDown" />
      {/* Introductory Section */}
      <section className="text-center mb-16 max-w-4xl">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
        >
          Welcome to Mood Catcher
        </motion.h1>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl mb-6 text-gray-600"
        >
          Your Self-Care Bullet Journal with Goals, Mood Diary & Happiness Tracker
        </motion.p>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg md:text-xl mb-6 text-gray-600"
        >
          Keep a diary and capture your day without writing down a single word!
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl w-full">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
        >
          How Does Mood Catcher Work?
        </motion.h2>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center mb-16 text-lg md:text-xl text-gray-600"
        >
          You can create a daily entry in two taps – pick mood and activities. We crunch data and display them in stats, charts, and correlations.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex flex-col items-center p-6 bg-white rounded-xl transition-transform transform hover:scale-105"
          >
            <Image src={moodSelect} alt="Check your moods" width={200} height={300} className="rounded-lg mx-auto" />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-center text-blue-700">Check your moods</h3>
            <p className="text-center text-gray-600">Check your mood from a range of emotions and keep track of how you feel daily.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex flex-col items-center p-6 bg-white rounded-xl transition-transform transform hover:scale-105"
          >
            <Image src={activitiesSelect} alt="View your Diary" width={200} height={300} className="rounded-lg mx-auto" />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-center text-blue-700">View your Diary</h3>
            <p className="text-center text-gray-600">View your diary entries and see how your day was captured without writing down a single word.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.1 }}
            className="flex flex-col items-center p-6 bg-white rounded-xl transition-transform transform hover:scale-105"
          >
            <Image src={trackLife} alt="View your Goals" width={200} height={300} className="rounded-lg mx-auto" />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-center text-blue-700">View your Goals</h3>
            <p className="text-center text-gray-600">Track your goals and see your progress over time.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
