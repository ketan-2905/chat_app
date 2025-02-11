"use client"
import { useTheme } from '@/context/ThemeContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const images = ["/images/light2.jpg", "/images/light3.jpg", "/images/light4.jpg"]

const getRandomImage = (theme: string) => {
  return images[Math.floor(Math.random() * images.length)];
};

const Poster = () => {
  const {theme} = useTheme()
  const [selectedImage, setSelectedImage] = useState("/images/light2.jpg");

  useEffect(() => {
    setSelectedImage(getRandomImage(theme))
  }, [theme]);

  return (
    <div className='w-1/2 h-screen relative hidden md:block'>
        <Image src={selectedImage} alt='Login page image' fill className='object-cover'/>
    </div>
  )
}

export default Poster
