'use client'
import Head from "next/head";
import Instructors from "./components/Instructor";
import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
import { CardHoverEffectDemo } from "./components/card";
import Navbar from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import InfinityLoader from "./components/infinite_loader";
import Speakers from './speakers/page';
import { PrizePool } from "./components/prize_pool";
import Footer from "./components/Footer";
import './globals.css';

export default function Home() {
  const [mounted, setMounted] = useState(false); // Track whether the component is mounted
  const eventsSectionRef = useRef(null); // Ref for the events section
  const [loading, setLoading] = useState(true);

  // Ensure the component is mounted before accessing query params
  useEffect(() => {
    setMounted(true); // Indicate that the component is mounted
  }, []);

  // Scroll to specific section based on URLSearchParams
  useEffect(() => {
    if (mounted) {
      const searchParams = new URLSearchParams(window.location.search); // Use URLSearchParams to get the query string
      const scrollTo = searchParams.get('scrollTo'); // Get the 'scrollTo' query parameter
      if (scrollTo === "events") {
        eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Simulate a loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {loading ? (
        <InfinityLoader /> // Show loader while loading
      ) : (
        <div>
          <Head>
            <title>ESummit -2024</title>
            <link rel="icon" href="/E-summit24 logo.png" />
          </Head>
          <div className="relative w-full bg-neutral-800 items-center justify-center">
            <Navbar handleScroll={handleScroll} />
          </div>
          <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
            <BackgroundBeamsWithCollisionDemo />
            
            {mounted && ( // Only render the scroll effect when mounted
              <section id="events" ref={eventsSectionRef}>
                <CardHoverEffectDemo />
              </section>
            )}
            <PrizePool />
            <Speakers />
            <section id="aboutUs">
              <Instructors />
            </section>
            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}
