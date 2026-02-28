import { useState } from 'react'

import Landing from "./components/Landing";
import SearchBar from "./components/SearchBar";
import PlantGrid from './components/PlantGrid';

function App() {
  const plants = [
    {
      name: "Fiddle Leaf Fig",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJY7VWm0jkAucpnvrg17P05cwjqU1wqhTUg&s",
        "https://fyf.tac-cdn.net/images/products/small/P-346.jpg?auto=webp&quality=60&width=650"
      ],
      features: [
        "Sunlight: Bright indirect",
        "Water: Moderate",
        "Difficulty: Easy"
      ]
    },
    {
      name: "Monstera Deliciosa",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJY7VWm0jkAucpnvrg17P05cwjqU1wqhTUg&s",
        "https://fyf.tac-cdn.net/images/products/small/P-346.jpg?auto=webp&quality=60&width=650"
      ],
      features: [
        "Sunlight: Bright indirect",
        "Water: Moderate",
        "Difficulty: Easy"
      ]
    },
    {
      name: "test",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJY7VWm0jkAucpnvrg17P05cwjqU1wqhTUg&s",
        "https://fyf.tac-cdn.net/images/products/small/P-346.jpg?auto=webp&quality=60&width=650"
      ],
      features: [
        "Sunlight: Bright indirect",
        "Water: Moderate",
        "Difficulty: Easy"
      ]
    },
    {
      name: "test 2",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJY7VWm0jkAucpnvrg17P05cwjqU1wqhTUg&s",
        "https://fyf.tac-cdn.net/images/products/small/P-346.jpg?auto=webp&quality=60&width=650"
      ],
      features: [
        "Sunlight: Bright indirect",
        "Water: Moderate",
        "Difficulty: Eassdjfdkjhsdbdsbfjhsdjsdhfhjgfskjdagfdsgfjsdgfjsdhgfjsdhgfjhsdgfhjsdgfhdsfgjshfgdjhfgsdfgsjdghfgfjshfskdjhfksdfhsdjhfkjsy"
      ]
    }
  ]

  
  return (
    <div className="min-h-screen">
      <h1 className="font-bold text-2xl p-6 text-center md:text-left">Site Name</h1>
      <Landing />

      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-xl">
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <PlantGrid plants={plants} />
      </div>
    </div>
  )
}

export default App