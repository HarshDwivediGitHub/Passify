import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-4 h-14 mycontainer">

        {/* Logo */}
        <div className="logo font-bold text-xl sm:text-2xl flex items-center">
          <img className="w-8 sm:w-10" src="icons/favicon.png" alt="logo" />
          Pass<span className="text-indigo-700">ify</span>
        </div>

        {/* Github button */}
        <button
          onClick={() => window.open("https://github.com/HarshDwivediGitHub", "_blank")}
          className="text-white bg-indigo-700 my-5 mx-2 rounded-full flex justify-center items-center ring-white ring-1"
        >
          <img
            className="invert w-10 p-1"
            src="icons/github_PNG40.png"
            alt="github logo"
          />
          <span className="font-bold px-2">Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar;
