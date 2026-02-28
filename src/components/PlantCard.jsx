import ImageCarousel from "./ImageCarousel";

function PlantCard({ name, images, features }) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-4">
      {/* Plant Image */}
      {/* <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" /> */}
      <ImageCarousel images={images} />

      {/* Plant Info */}
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-2">{name}</h2>

        {/* Features / List */}
        {features && features.length > 0 && (
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
}

export default PlantCard;