import ImageCarousel from "./ImageCarousel";
import Button from "./Button";

function PlantPreview({ plant, onButtonClick }) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-4">
        {/* Plant Images */}
        <ImageCarousel images={plant.images} />

        {/* Plant Info */}
        <div className="mt-4">
            <h2 className="font-bold text-2xl mb-2">{plant.plantName}</h2>
        </div>

        {/* Button */}
        <div className="mt-4 flex justify-end">
            <Button onClick={() => onButtonClick(plant)}>View</Button>
        </div>
    </div>
  );
}

export default PlantPreview;