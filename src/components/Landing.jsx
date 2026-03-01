import PlantImage from "../assets/green_plant.jpg";
import Button from "./Button"

function Landing({ onTryNow }) {
    return (
        <div className="flex justify-center pt-12">
            <div className="flex flex-col md:flex-row items-center gap-8 p-4 max-w-5xl">

                {/* Image */}
                <img 
                    src={PlantImage} 
                    alt="Plant" 
                    className="w-full max-w-sm md:max-w-md rounded-xl" 
                />

                {/* Text & Search */}
                <div className="p-4 text-center md:text-left">
                    <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
                        Your Guide to Finding the Perfect Plant.
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl my-4">
                        Access data for 350+ species.<br />  
                        Filter by growth, sunlight, and difficulty of care.
                    </p>

                    <Button className="text-2xl" onClick={onTryNow}>Start Exploring</Button>
                </div>
            </div>
        </div>
    );
}

export default Landing;