import React, { useContext } from 'react'
import SidebarUserOption from '../UserOption/SidebarUserOption'
import SidebarCoversations from './SidebarCoversations'

const Sidebar = () => {
  return (
    <div className='p-2 flex flex-row-reverse md:flex-col gap-3 h-full max-h-[100vh]'>
      <SidebarCoversations />
      <SidebarUserOption />
    </div>
  )
}

export default Sidebar
