import { useState, useEffect, useRef } from 'react'

import Landing from "./components/Landing";
import SearchBar from "./components/SearchBar";
import PlantGrid from './components/PlantGrid';
import FilterForm from './components/FilterForm'
import Logo from "./assets/sunflower.png";

function App() {
  // fetch plant data 
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [resetFilters, setResetFilters] = useState(false);
  const [value, setValue] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:4000/search"); 
        const data = await res.json();

        const formatted = data.map((plant) => ({
          plantName: plant.plantName,
          growth: plant.growth,
          soil: plant.soil,
          sunlight: plant.sunlight,
          watering: plant.watering,
          fertilizationType: plant.fertilizationType,
          difficultyOfCare: plant.difficultyOfCare,
          classification: plant.classification,
          description: plant.description || "",
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

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFiltersChange = (filters) => {
    const query = new URLSearchParams();
    setValue("");

    // Growth filters
    filters.growth.forEach(g => query.append("growth", g));

    // Sunlight filters
    filters.sunlight.forEach(s => query.append("sunlight", s));

    // Difficulty range
    query.append("difficultyMin", filters.difficultyOfCare.min);
    query.append("difficultyMax", filters.difficultyOfCare.max);

    fetch(`http://localhost:4000/plants?${query.toString()}`)
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(console.error);
  };

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      setResetFilters(true);  

      const res = await fetch(
        `http://localhost:4000/search?name=${encodeURIComponent(searchTerm)}`
      );

      const data = await res.json();

      // Transform backend data
      const formatted = data.map((plant) => ({
        plantName: plant.plantName,
        growth: plant.growth,
        soil: plant.soil,
        sunlight: plant.sunlight,
        watering: plant.watering,
        fertilizationType: plant.fertilizationType,
        difficultyOfCare: plant.difficultyOfCare,
        classification: plant.classification,
        description: plant.description || "",
        images: plant.images
      }));

      setPlants(formatted);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
      setResetFilters(false);  
    }
  };
  
return (
    <div className="min-h-screen">
      <img 
        src={Logo}
        alt="xylem"
        className="absolute top-4 left-4 w-12 h-12 object-cover z-10"
      />
      <h1 className="font-bold text-2xl p-6 pl-16.5 text-center md:text-left">
        Xylem
      </h1>

      <Landing onTryNow={scrollToSearch} />

      <div ref={searchRef} className="mt-64 flex justify-center">
        <div className="mx-8 mt-12 w-full max-w-xl">
          <SearchBar onSearch={handleSearch} value={value} setValue={setValue} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 flex flex-col lg:flex-row gap-8">
        {/* Sticky Filter */}
        <div className="lg:w-1/4">
          <div className="sticky top-8">
            <FilterForm onChange={handleFiltersChange} resetFilters={resetFilters}/>
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