"use client"
import Navbar from '@/components/front-end/Navbar'
import React from 'react'

const SmoothieMaker = () => {
  return (
    <div>
      <Navbar setShowCart={function (value: React.SetStateAction<boolean>): void {
        throw new Error('Function not implemented.')
      } }/>
      <h1>Smoothie Maker</h1>
    </div>
  )
}

export default SmoothieMaker