"use client";

import Image from 'next/image';
import Link from 'next/link';
import moodSelect from '../../public/mood-select.png';
import activitiesSelect from '../../public/activities-select.png';
import trackLife from '../../public/track-life.png';

const HomePage = () => {
  return (
    <div className="bg-light-blue-50 min-h-screen p-8">
      {/* Introductory Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Mood Catcher</h1>
        <p className="text-xl mb-6">
          Self-Care Bullet Journal with Goals, Mood Diary & Happiness Tracker
        </p>
        <p className="text-lg mb-6">
          Keep a diary and capture your day without writing down a single word!
        </p>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">How Does Mood Catcher Work?</h2>
        <p className="text-center mb-16">
          You can create a daily entry in two taps – pick mood and activities. We crunch data and display them in stats, charts, and correlations.
        </p>
        <div className="flex overflow-x-auto space-x-8 pb-4">
          <Link href="/moods" className="min-w-[300px] p-4 bg-white shadow-md rounded-lg">
            <Image src={moodSelect} alt="Check your moods" width={300} height={500} className="rounded-lg" />
            <h3 className="text-2xl font-semibold mt-4 mb-2">Check your moods</h3>
            <p>Check your mood from a range of emotions and keep track of how you feel daily.</p>
          </Link>
          <Link href="/your-diary" className="min-w-[300px] p-4 bg-white shadow-md rounded-lg">
            <Image src={activitiesSelect} alt="View your Diary" width={300} height={500} className="rounded-lg" />
            <h3 className="text-2xl font-semibold mt-4 mb-2">View your Diary</h3>
            <p>View your diary entries and see how your day was captured without writing down a single word.</p>
          </Link>
          <Link href="/your-goals" className="min-w-[300px] p-4 bg-white shadow-md rounded-lg">
            <Image src={trackLife} alt="View your Goals" width={300} height={500} className="rounded-lg" />
            <h3 className="text-2xl font-semibold mt-4 mb-2">View your Goals</h3>
            <p>Track your goals and see your progress over time.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
