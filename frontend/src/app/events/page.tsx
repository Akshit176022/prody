"use client"
import Navbar from '../componenets/Navbar'
import ThreeScene from '../componenets/ThreeD'
import React from 'react'

const page = () => {
  return (
    <div className='bg-black'>
<Navbar/>
<div className='bg-red-700 mt-8 '>
  <ThreeScene/>
</div>
</div>  )
}

export default page;
