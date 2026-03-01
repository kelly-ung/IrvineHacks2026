import PlantImage from "../assets/green_plant.jpg";
import Button from "./Button"

function Landing({ onTryNow }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">

      {/* Background glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] 
                      bg-green-200 rounded-full blur-3xl opacity-30" />

      <div className="relative flex justify-center">
        <div className="flex flex-col md:flex-row items-center gap-16 px-6 max-w-6xl">

          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-green-300 rounded-3xl 
                            blur-2xl opacity-20 group-hover:opacity-30 
                            transition duration-500" />
            <img 
              src={PlantImage}
              alt="Plant"
              className="relative w-full max-w-md rounded-3xl 
                         shadow-2xl transition-transform duration-500 
                         group-hover:scale-105"
            />
          </div>

          {/* Text */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl 
                           leading-tight tracking-tight">
              Find Your  
              <span className="block bg-gradient-to-r from-green-600 to-emerald-400 
                               bg-clip-text text-transparent">
                Perfect Plant
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mt-6">
              Explore 350+ species. Filter by growth, sunlight, and care difficulty —
              discover plants tailored to your space.
            </p>

            <div className="mt-8">
              <Button 
                onClick={onTryNow}
                className="px-8 py-4 text-lg rounded-2xl 
                           bg-green-600 text-white 
                           hover:bg-green-700 
                           hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]
                           transition-all duration-300"
              >
                Start Exploring
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Landing;