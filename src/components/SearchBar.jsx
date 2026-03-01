import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search plants..."
        className="border p-2 w-full rounded-l"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 rounded-r"
      >
        Search
      </button>
    </form>
  );
}