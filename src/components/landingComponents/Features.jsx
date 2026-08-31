import { Compass, GlobeCheck, MapPinSearch, ShieldCheck } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const featuresData =  [
    {
        title: "24*7 Availability",
        content:"Our Website WorKs 24*7 without any interrruption.We guarantee 100% uptime.",
        icon: GlobeCheck,
        link:"/about",
    },
    {
         title: "Curated Itineraries",
         content: "Expertly crafted travel plans tailored to your unique interests and pacing.",
         icon: Compass,
         link: "/about",
    },
    {
        title: "Secure Booking",
        content: "Encrypted checkout systems ensure your personal data and payments remain safe.",
        icon: ShieldCheck,
        link: "/contact",
    },
    {
        title: "Local Tour Guides",
        content: "Connect with certified local experts for authentic cultural and historic insights.",
        icon: MapPinSearch,
        link: "/contact",
    }

]

const Features = () => {

    const navigate = useNavigate();

    return (
        <div className='px-20 py-24'>
            {/* heading */}
            <div>
                <h2 onClick={()=>{navigate("/features")}} className='text-4xl font-bold text-center'>Features</h2>
            </div>

            {/* content  */}
            <div className='grid grid-cols-4 gap-6 mt-20'>
                {
                    featuresData.map((feature,index)=>{
                        return (
                            <div key={index} onClick={()=>{navigate(feature.link)}} className='border rounded p-4 border-gray-300 cursor-pointer'>

                                <feature.icon size={40} className="text-blue-600 mb-4" />
                                
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p>{feature.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Features
