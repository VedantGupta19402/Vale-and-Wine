import React from 'react'
import Navbar from './Navbar'
import Sales from './Sales'
import Swipe from './Swipe'
import Video from './Video'

const Section1 = () => {
  return (
    <div className='min-h-full min-w-full' >
            <Navbar />
        < Swipe />
        < Sales />
  <Video />
      
    </div>
  )
}

export default Section1
