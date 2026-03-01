import { useState } from "react";

function FilterForm({ onChange }) {
  const [filters, setFilters] = useState({
    growth: [],
    sunlight: [],
    difficultyOfCare: { min: 1, max: 10 },
  });

  const growthOptions = ["slow", "moderate", "fast"];
  const sunlightOptions = [
    "indirect sunlight",
    "full sunlight",
    "partial sunlight",
  ];

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
      const newFilters = {
        ...prev,
        difficultyOfCare: {
          ...prev.difficultyOfCare,
          [type]: Number(value),
        },
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
          {growthOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-green-600"
                checked={filters.growth.includes(option)}
                onChange={() =>
                  handleCheckboxChange("growth", option)
                }
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
          {sunlightOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-yellow-500"
                checked={filters.sunlight.includes(option)}
                onChange={() =>
                  handleCheckboxChange("sunlight", option)
                }
              />
              <span className="text-gray-600 capitalize">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty Range */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">
          Difficulty Of Care (1–10)
        </h3>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Min</label>
            <input
              type="number"
              min="1"
              max="10"
              value={filters.difficultyOfCare.min}
              onChange={(e) =>
                handleDifficultyChange("min", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500">Max</label>
            <input
              type="number"
              min="1"
              max="10"
              value={filters.difficultyOfCare.max}
              onChange={(e) =>
                handleDifficultyChange("max", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
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
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl transition"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterForm;