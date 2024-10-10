'use client'
import React from 'react';
import { motion } from 'framer-motion';

const speakers = [
  { name: 'Anoushka Rele', bio: 'Founder and CEO, Polish Me Pretty', image: '/speakers/speaker-2.png' },
  { name: 'Mangesh Shinde', bio: 'Founder, WillStar Media', image: '/speakers/speaker-1.png' },
  { name: 'Ankita Singh', bio: 'Founder, Be That Diva', image: '/speakers/speaker-3.png' },
];

const SpeakersSection = () => {
  return (
    <section className="bg-black flex flex-col items-center pt-10 mb-[10%] md:mb-[0%] min-h-screen">
      <h2 className="text-3xl sm:text-4xl text-white font-bold mb-12">Meet the Speakers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-3  px-20 ">
        {speakers.map((speaker, index) => (
          <motion.div
            key={index}
            className="bg-black p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={speaker.image}
              className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-2xl object-cover"
              width={100}
              height={100}
              whileHover={{ scale: 1.1 }} // Pop-up effect on hover
              transition={{ duration: 0.3 }} // Smooth transition
            />
            <h3 className="text-xl font-semibold text-center mt-7">{speaker.name}</h3>
            <p className="text-center text-gray-600">{speaker.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpeakersSection;
