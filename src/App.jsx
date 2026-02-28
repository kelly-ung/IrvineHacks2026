import { useState } from 'react'
import Landing from "./components/Landing";
import PlantCard from "./components/PlantCard";

function App() {
  const features = [
    "Sunlight: Bright indirect",
    "Water: Moderate",
    "Difficulty: Easy"
  ];

  const plantImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJY7VWm0jkAucpnvrg17P05cwjqU1wqhTUg&s",
    "https://fyf.tac-cdn.net/images/products/small/P-346.jpg?auto=webp&quality=60&width=650"
  ];

  
  return (
    <div className="min-h-screen">
      <h1 className="font-bold text-2xl p-6 text-center md:text-left">Site Name</h1>
      <Landing />

      <PlantCard
        name="Fiddle Leaf Fig"
        images={plantImages}
        features={features}
      />
    </div>
  )
}

export default App