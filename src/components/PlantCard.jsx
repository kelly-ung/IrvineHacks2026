import ImageCarousel from "./ImageCarousel";
import Button from "./Button";

function PlantCard({ plant, onButtonClick }) {
  // 1. Find the first valid image, or use a placeholder
  const mainImage = plant.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image+Available';

  // Helper to color-code difficulty
  const difficultyColor = plant.difficultyOfCare > 7 ? "text-red-600 bg-red-50" : "text-green-700 bg-green-50";

  return (
    // Reverted to a single column (flex-col) and added specialized height/max-height logic
    <div className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col 
                    max-h-[90vh] md:max-h-[800px] border border-gray-100">

      {/* --- Image Safe Zone (Top) --- */}
      <div className="w-full bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100 
                      h-60 md:h-80 relative group">
        
        {/* We keep the image container a fixed height. */}
        <div className="w-full h-full relative">
        <ImageCarousel images={plant.images} />
      </div>

        {/* --- Header & Tags (Now positioned below/around the image area) --- */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          {(Array.isArray(plant.classification) ? plant.classification : [plant.classification]).map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-green-900">
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-4 py-1 rounded-full text-xs font-bold shadow-sm ${difficultyColor}`}>
            Level {plant.difficultyOfCare}
          </span>
        </div>
      </div>

      {/* --- Information Section (Body - Scrollable if needed) --- */}
      <div className="p-6 md:p-8 overflow-y-auto">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-gray-950 leading-tight mb-2 tracking-tight">
          {plant.plantName}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 border-l-4 border-green-800/30 pl-4 italic bg-gray-50/50 py-3 rounded-r-lg">
          {plant.description}
        </p>

        {/* --- Stats Grid (Refined) --- */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-4 border-t border-gray-100 pt-8 mt-8">
          <StatItem label="Sunlight" value={plant.sunlight} icon="☀️" />
          <StatItem label="Watering" value={plant.watering} icon="💧" />
          <StatItem label="Growth" value={plant.growth} icon="📈" />
          <StatItem label="Soil" value={plant.soil} icon="🪴" />
          <StatItem label="Fertilizer" value={plant.fertilizationType} icon="🧪" />
        </div>
      </div>

      {/* --- Footer (Sticky) --- */}
      <div className="p-6 pt-0 mt-auto border-t border-gray-100 flex justify-end sticky bottom-0 bg-white z-20">
        <Button 
          className="bg-gray-900 hover:bg-black text-white px-10 py-3 rounded-full transition-all active:scale-95 shadow-lg cursor-pointer font-semibold" 
          onClick={onButtonClick}
        >
          Close Detail
        </Button>
      </div>
    </div>
  );
}

// Stats component remains the same
function StatItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center bg-gray-100/70 rounded-xl text-xl">
        {icon}
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">{label}</p>
        <p className="text-sm font-semibold text-gray-900 capitalize leading-tight">{value}</p>
      </div>
    </div>
  );
}

export default PlantCard;