import React from 'react'
import CustomButton from '../common/CustomButton'

const Hero = () => {
  return (
    <div className="relative">
        {/* image */}
        <div className="w-full h-[92vh] overflow-hidden flex items-center">
            <img src ="/img.png" alt="Wander-Wise hero section" 
            className= "w-full"
            />
        </div>
        {/* overlay */}
        <div className="w-full h-[92vh] bg-black absolute top-0 opacity-40">
      
        </div>
        {/* content */}
        <div className="absolute top-0 w-full h-[90vh] flex items-center justify-center">
            
            <div className=" w-1/2 mx-auto text-center">

            <h1 className="text-5xl font-bold text-white ">
                Plan your trips with wanderwise 🛫
            </h1>

            <p className="text-white mt-4 text-lg leading-8 tracking-normal ">
               Uncover your next great adventure with a community of global
               explorer find local-approved recommendations and plan a journey unique to you.
            </p>

           <CustomButton text="Get Started" className="mt-4" />
           <CustomButton text="Learn More" className="mt-4 ml-4"/>
           
          </div>

        </div>

    </div>
   )
}
export default Hero