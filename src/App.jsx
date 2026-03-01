import { useState, useEffect } from 'react'

import Landing from "./components/Landing";
import SearchBar from "./components/SearchBar";
import PlantGrid from './components/PlantGrid';
import FilterForm from './components/FilterForm'

function App() {
  // fetch plant data 
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:4000/search"); 
        const data = await res.json();

        const formatted = data.map((plant) => ({
          name: plant.plantName,
          growth: plant.growth,
          soil: plant.soil,
          sunlight: plant.sunlight,
          watering: plant.watering,
          fertilizationType: plant.fertilizationType,
          difficultyOfCare: plant.difficultyOfCare,
          classification: plant.classification,
          images: plant.images,
        }));

        setPlants(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const handleFiltersChange = (filters) => {
    console.log("Updated filters:", filters);
  };

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:4000/search?name=${encodeURIComponent(searchTerm)}`
      );

      const data = await res.json();

      // Transform backend data
      const formatted = data.map((plant) => ({
        name: plant.plantName,
        growth: plant.growth,
        soil: plant.soil,
        sunlight: plant.sunlight,
        watering: plant.watering,
        fertilizationType: plant.fertilizationType,
        difficultyOfCare: plant.difficultyOfCare,
        classification: plant.classification,
        images: plant.images
      }));

      setPlants(formatted);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };
  
return (
    <div className="min-h-screen">
      <h1 className="font-bold text-2xl p-6 pl-12 text-center md:text-left">
        Xylem
      </h1>

      <Landing />

      <div className="mt-64 flex justify-center">
        <div className="mx-8 w-full max-w-xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 flex flex-col lg:flex-row gap-8">
        {/* Sticky Filter */}
        <div className="lg:w-1/4">
          <div className="sticky top-8">
            <FilterForm onChange={handleFiltersChange} />
          </div>
        </div>

        {/* Plant Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <PlantGrid plants={plants} onSelect={setSelectedPlant} />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;