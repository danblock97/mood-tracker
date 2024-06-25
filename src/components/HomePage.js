"use client";

import Image from 'next/image';
import Link from 'next/link';
import moodSelect from '../../public/mood-select.png';
import activitiesSelect from '../../public/activities-select.png';
import trackLife from '../../public/track-life.png';

const HomePage = () => {
  return (
    <div className="bg-light-blue-50 min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Introductory Section */}
      <section className="text-center mb-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Mood Catcher</h1>
        <p className="text-lg md:text-xl mb-6">
          Self-Care Bullet Journal with Goals, Mood Diary & Happiness Tracker
        </p>
        <p className="text-base md:text-lg mb-6">
          Keep a diary and capture your day without writing down a single word!
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How Does Mood Catcher Work?</h2>
        <p className="text-center mb-16 text-base md:text-lg">
          You can create a daily entry in two taps – pick mood and activities. We crunch data and display them in stats, charts, and correlations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/moods" className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
            <Image src={moodSelect} alt="Check your moods" width={300} height={500} className="rounded-lg mx-auto" />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-center">Check your moods</h3>
            <p className="text-center">Check your mood from a range of emotions and keep track of how you feel daily.</p>
          </Link>
          <Link href="/your-diary" className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
            <Image src={activitiesSelect} alt="View your Diary" width={300} height={500} className="rounded-lg mx-auto" />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-center">View your Diary</h3>
            <p className="text-center">View your diary entries and see how your day was captured without writing down a single word.</p>
          </Link>
          <Link href="/your-goals" className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
            <Image src={trackLife} alt="View your Goals" width={300} height={500} className="rounded-lg mx-auto" />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-center">View your Goals</h3>
            <p className="text-center">Track your goals and see your progress over time.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
