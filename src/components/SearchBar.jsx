import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, value, setValue }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
  <form onSubmit={handleSubmit} className="w-full max-w-md ml-auto"> 
    {/* Use ml-auto to keep it pushed to the right side of the screen */}
    <div className="relative group">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search plants..."
        className="w-full border-2 border-gray-100 p-3 pr-16 rounded-full 
                   bg-white shadow-sm outline-none transition-all duration-300
                   placeholder:text-gray-400
                   focus:border-green-800"
      />

      <button
        type="submit"
        className="absolute right-1 top-1 bottom-1 bg-green-800 hover:bg-green-900 
                   text-white px-5 rounded-full transition-all duration-200 
                   flex items-center justify-center active:scale-95 shadow-md cursor-pointer"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="size-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </div>
  </form>
);
}