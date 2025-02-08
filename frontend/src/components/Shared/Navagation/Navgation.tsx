"use client"
import { useContext } from 'react'
import Sidebar from './Sidebar/Sidebar'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'


const Navgation = () => {
  const {theme} = useTheme()
  return (
    <nav className='h-screen w-1/3'>
        <Sidebar />
    </nav >
  )
}

export default Navgation
