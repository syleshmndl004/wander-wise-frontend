import React from 'react'
import CustomButton from './CustomButton'

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-2 border-purple-100
    py-4 px-20 
    
    ">
        <div>
            {/*left part */}
            <h1 className="text-3xl font-semibold text-black">WanderWise</h1>
        </div>

            {/*right part*/}
        <div className="flex items-center gap-16 ">
           <nav className="space-x-6 text-lg font-medium
            [&>a]:hover:text-purple-600 ">
            <a href ="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
           </nav>

          <CustomButton text="Log in" link="/login"/>

        </div>
    </header>
  )
}

export default Navbar