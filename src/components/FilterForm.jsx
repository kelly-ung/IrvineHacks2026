import { useState, useEffect } from "react";

function FilterForm({ onChange }) {
  const [filters, setFilters] = useState({
    growth: [],
    sunlight: [],
    difficultyOfCare: { min: 1, max: 10 },
  });

  const [options, setOptions] = useState({
    growth: [],
    sunlight: [],
    difficulty: [],
  });

  useEffect(() => {
    fetch("http://localhost:4000/filters")
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch(console.error);
  }, []);

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const exists = prev[category].includes(value);

      const updated = exists
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      const newFilters = { ...prev, [category]: updated };

      onChange?.(newFilters);
      return newFilters;
    });
  };

  const handleDifficultyChange = (type, value) => {
    setFilters((prev) => {
      let newMin = prev.difficultyOfCare.min;
      let newMax = prev.difficultyOfCare.max;
      const numericValue = Number(value);

      if (type === "min") {
        newMin = Math.min(numericValue, newMax);
      } else {
        newMax = Math.max(numericValue, newMin);
      }

      const newFilters = {
        ...prev,
        difficultyOfCare: { min: newMin, max: newMax },
      };

      onChange?.(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800">Filter Plants</h2>

      {/* Growth */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Growth</h3>
        <div className="space-y-2">
          {options.growth.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-green-600"
                checked={filters.growth.includes(option)}
                onChange={() => handleCheckboxChange("growth", option)}
              />
              <span className="text-gray-600 capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sunlight */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Sunlight</h3>
        <div className="space-y-2">
          {options.sunlight.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-yellow-500"
                checked={filters.sunlight.includes(option)}
                onChange={() => handleCheckboxChange("sunlight", option)}
              />
              <span className="text-gray-600 capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty Slider */}
      <div>
        <h3 className="font-medium text-gray-700 mb-4">
          Difficulty Of Care (1-10)
        </h3>

        <div className="relative w-full">
          {/* Min slider */}
          <input
            type="range"
            min="1"
            max="10"
            value={filters.difficultyOfCare.min}
            onChange={(e) =>
              handleDifficultyChange("min", e.target.value)
            }
            className="absolute w-full appearance-none bg-transparent pointer-events-none
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-green-600
              [&::-webkit-slider-thumb]:translate-y-1.5"
          />

          {/* Max slider */}
          <input
            type="range"
            min="1"
            max="10"
            value={filters.difficultyOfCare.max}
            onChange={(e) =>
              handleDifficultyChange("max", e.target.value)
            }
            className="w-full h-2 bg-green-200 rounded-lg appearance-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-green-600"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span>Min: {filters.difficultyOfCare.min}</span>
          <span>Max: {filters.difficultyOfCare.max}</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          const resetFilters = {
            growth: [],
            sunlight: [],
            difficultyOfCare: { min: 1, max: 10 },
          };
          setFilters(resetFilters);
          onChange?.(resetFilters);
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-full transition"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterForm;