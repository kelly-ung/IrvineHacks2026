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

        {/* Features */}
        {plant.features && plant.features.length > 0 && (
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {plant.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Button */}
      <div className="mt-4 flex justify-end">
        <Button onClick={() => onButtonClick()}>Close</Button>
      </div>
    </div>
  );
}

export default PlantCard;