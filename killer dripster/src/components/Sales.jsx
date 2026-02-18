import React from 'react'

const Sales = () => {
  return (
    <div>
      {/* main */}
      <div className='h-22 w-full bg-pink-100'>
        {/* upper section 1 */}

        <div className='h-10 w-full bg-amber-500 flex items-center justify-center'>
          <h1>SALES</h1>
        </div>
        {/* upper sec2 */}
        <div className='h-10 w-full flex items-center justify-center gap-20'>
          <button className='border-2'>SEE MEN</button>
          <button className='border-2'>SEE WOMEN</button>
        </div>
      </div>

      {/* main neeche wala */}
      <div className='h-170.5 min-w-full bg-[#DCDAD7] flex justify-around'>
        {/* 1 div */}
        <div className='h-160 w-full p-[30vw] '>
          <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/collection_tile_lM2zjeJ.jpg?w=360&dpr=2" alt="OLD MONEY" />
        </div>


        <div className='h-160 w-full '>
          <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/collection_tile_n1mufP1.jpg?w=360&dpr=2" alt="OLD MONEY" />
        </div>
      </div>

      {/* neeche 2 */}
      <div className='h-170.5 w-full  bg-[#DCDAD7] flex justify-around'>
        {/* 1 div */}
        <div className='h-160 w-full'>
          <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Office_big_tile_final.jpg?w=360&dpr=2" alt="OLD MONEY" />
        </div>


        <div className='h-160 w-full'>
          <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/collection-tile_TdbZCtq.jpg?w=360&dpr=2" alt="OLD MONEY" />
        </div>
      </div>

    </div>
  )
}

export default Sales