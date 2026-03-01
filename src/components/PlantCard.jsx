import ImageCarousel from "./ImageCarousel";
import Button from "./Button";

function PlantCard({ plant, onButtonClick }) {
  return (
    <div className="max-w-3xl rounded-xl overflow-hidden shadow-lg bg-white p-30">
      {/* Plant Images */}
      <ImageCarousel images={plant.images} />

      {/* Plant Info */}
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-2">{plant.name}</h2>

        {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p><strong>Growth:</strong> {plant.growth}</p>
        <p><strong>Soil:</strong> {plant.soil}</p>
        <p><strong>Sunlight:</strong> {plant.sunlight}</p>
        <p><strong>Watering:</strong> {plant.watering}</p>
        <p><strong>Fertilization:</strong> {plant.fertilizationType}</p>
        <p><strong>Difficulty:</strong> {plant.difficultyOfCare}</p>
        <p className="md:col-span-2">
          <strong>Classification: </strong> 
          {Array.isArray(plant.classification)
          ? plant.classification.join(", ")
          : plant.classification}
        </p>
      </div>
      </div>
      
      {/* Button */}
      <div className="mt-4 flex justify-end">
        <Button onClick={() => onButtonClick()}>Close</Button>
      </div>
    </div>
  );
}

export default PlantCard;