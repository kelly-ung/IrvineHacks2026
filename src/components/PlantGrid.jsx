import { useState } from 'react'
import PlantPreview from "./PlantPreview";
import PlantCard from './PlantCard';

function PlantGrid({ plants }) {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [visibleCount, setVisibleCount] = useState(15);

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
  };

  const handleCloseClick = () => {
    setSelectedPlant(null);
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  const visiblePlants = plants.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-left">Results</h1>

      {/* Grid */}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {visiblePlants.map((plant) => (
          <PlantPreview
            key={plant.plantName} 
            plant={plant}
            onButtonClick={handlePlantClick}
          />
        ))}
      </div>

      {/* See More Button */}
      {visibleCount < plants.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSeeMore}
            className="bg-green-800 hover:bg-green-950 text-white px-4 py-2 rounded-full transition cursor-pointer"          >
            See More
          </button>
        </div>
      )}

      {/* Display selected plant */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <PlantCard 
            plant={selectedPlant}
            onButtonClick={handleCloseClick}
          />
        </div>
      )}
    </div>
  );
}

export default PlantGrid;