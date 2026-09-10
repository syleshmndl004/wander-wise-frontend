import React from 'react'
import CustomButton from './CustomButton'
import useAuth from '../../hooks/useAuth'

const AppNavbar = () => {

    const {onLogout} = useAuth()
  return (
    <header className="flex items-center justify-between border-2 border-purple-100
    py-4 px-20 
    
    ">
        <div>
            {/*left part */}
            <h1 className="text-3xl font-semibold text-blue-500">WanderWise</h1>
        </div>

            {/*right part*/}
        <div className="flex items-center gap-16 ">
           <nav className="space-x-6 text-lg font-medium
            [&>a]:hover:text-purple-600 text-blue-700">

            <a href ="/Dashboard">Dashboard</a>
            <a href="/trips">Trips</a>
            <a href="/Itineraries">Itineraries</a>
            <a href="/Baggage">Baggage</a>
            
           </nav>
          <div onClick={() => onLogout()}>
          <CustomButton text="log out" />
            </div>
        </div>
    </header>
  )
}

export default AppNavbar