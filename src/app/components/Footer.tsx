import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
      <p className="mb-4">
      E-Summit is an annual entrepreneurial event organized by the Entrepreneurship Cell of the IIIT Pune. It serves as a platform to encourage innovation, startup culture, and entrepreneurial mindset among students and aspiring entrepreneurs.
      </p>
    </div>
    <div >
      <h2 className="text-white text-lg font-semibold mb-4 ">Quick Links</h2>
      <ul>
        <li>
          <Link
            href="/"
            className="hover:text-white transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="/"
            className="hover:text-white transition-colors duration-300"
          >
          Events
          </a>
        </li>
        <li>
          <Link
            href="/leaderboard"
            className="hover:text-white transition-colors duration-300"
          >
            LeaderBoard
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300"
          >
            Tickets
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
      <div className="flex space-x-4">
        <a
          href="https://www.youtube.com/channel/UCBRfXeWo-YSFt25wlZGr30w"
          className="hover:text-white transition-colors duration-300"
        >
          Youtube
        </a>
        <Link          href="https://www.linkedin.com/company/e-cell-iiit-pune/mycompany/"
          className="hover:text-white transition-colors duration-300"
        >
          Linkedin
        </Link>
        <a
          href="#"
          className="hover:text-white transition-colors duration-300"
        >
          Instagram
        </a>
      </div>
    </div>
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
      <p>Pune, India</p>
      <p>Pune 411041</p>
      <p>Email: ecellofficial@gmail.com</p>
      <p>Phone: +919896316033</p>
    </div>
    </div>
    <p className="text-center text-[25px] pt-8">© 2024 Ecell. All rights reserved.</p>
</footer>   
  )
}

export default Footer