import React from "react";
import { useNavigate } from "react-router-dom";

const tripsData = [
  {
    title: "Mystical Kathmandu",
    content:
      "Explore ancient Durbar Squares, marvel at the sacred Swayambhunath Stupa, and wander through bustling historic bazaars.",
    image:
      "https://plus.unsplash.com/premium_photo-1691735665916-cf31006dffe3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2F0aG1hbmR1fGVufDB8fDB8fHww",
    link: "/trips/kathmandu",
  },
  {
    title: "Scenic Pokhara",
    content:
      "Relax beside the serene Phewa Lake, gaze at the majestic Annapurna range, and experience thrilling adventure sports.",
    image:
      "https://media.istockphoto.com/id/532348030/photo/twilight-with-boats-on-phewa-lake-pokhara-nepal.webp?a=1&b=1&s=612x612&w=0&k=20&c=y5i139ubF0vN4kCP1TeEEj8uRxwEvoX5xTamJF5uDy4=",
    link: "/trips/pokhara",
  },
  {
    title: "Wild Chitwan",
    content:
      "Embark on thrilling jungle safaris, spot endangered one-horned rhinos, and immerse yourself in vibrant Tharu culture.",
    image:
      "https://images.unsplash.com/photo-1549888668-19281758dfbe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZCUyMGNoaXR3YW58ZW58MHx8MHx8fDA%3D",
    link: "/trips/chitwan",
  },
  {
    title: "Spiritual Lumbini",
    content:
      "Walk through the sacred birthplace of Lord Buddha, visit peaceful international monasteries, and explore historic Mayadevi Temple.",
    image:
      "https://images.unsplash.com/photo-1706752227538-d3a0c4c9cd2a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3Bpcml0dWFsJTIwY2hpdHdhbnxlbnwwfHwwfHx8MA%3D%3D",
    link: "/trips/lumbini",
  },
];


const FamousTrips = () => {
  const navigate = useNavigate();

  return (
    <div className="px-20 py-24">
      {/* heading */}
      <div>
        <h2 className="text-4xl font-bold text-center">Famous Trips</h2>
      </div>

      {/* content  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {tripsData.map((feature, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(feature.link);
              }}
              className="border rounded p-4 border-gray-300 cursor-pointer hover:shadow-md transition-shadow bg-red-50 md:bg-amber-300"
            >
              <div className="w-full h-55  ">
                <img className="w-full h-48 "
                  src={feature.image}
                  alt={feature.title} 
                />
              </div>

              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FamousTrips;
