"use client"
import useWindowWidth from '@/hooks/useWindowWidth '
import Sidebar from './Sidebar/Sidebar'


const Navgation = () => {
  const width = useWindowWidth()
  return (
    <nav className='h-screen md:w-[50%] lg:w-1/3'>
        <Sidebar />
    </nav >
  )
}

export default Navgation
