import { useState } from 'react'

import PlantPreview from "./PlantPreview";
import PlantCard from './PlantCard';

function PlantGrid({ plants }) {
  const [selectedPlant, setSelectedPlant] = useState(null); 

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
  };

  const handleCloseClick = () => {
    setSelectedPlant(null);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-left">Results</h1>

      {/* Grid */}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {plants.map((plant, index) => (
          <PlantPreview
            key={index}
            plant={plant}
            onButtonClick={handlePlantClick}
          />
        ))}
      </div>

      {/* Display selected plant */}
      {selectedPlant &&
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {selectedPlant && (
            <PlantCard 
              plant={selectedPlant}
              onButtonClick={handleCloseClick}
            />
          )}
        </div>
      }
    </div>
  );
}

export default PlantGrid;