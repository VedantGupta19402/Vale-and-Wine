
import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";


const Navbar = () => {
  return (
    <div>
      
<div className="main h-28 flex bg-[#DCDAD7] justify-around items-center gap-5">
    <div className='h-23 w-30 bg-[#DCDAD7] text-3xl'>
        <img src='logo.png' alt='vale and wine' className='bg-cover h-full'/>
        {/* will do later */}
    </div>


    <div className=' h-15 w-130  flex items-center justify-between font-medium text-none'>
        <a href="#">Man</a>
        <a href="#">Women</a>
        <a href="#">Children</a>
        <a href="#">Athletics</a>
        <a href="#">Explore</a>
    </div>

 {/* icons will do later */}
    <div>
        <div className=' h-15 w-30  flex justify-between items-center text-2xl'>
            <IoMdSearch/>
            {/* account */}
            {/* club */}
            <FaRegHeart />
            <IoCartSharp />
          
        </div>
    </div>
</div>

    </div>
  )
}
// 629FAD
export default Navbar

