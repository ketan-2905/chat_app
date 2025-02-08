import { PropsWithChildren } from 'react'


interface MenueItemProps{
    onClick: ()=>void,
    className?: string,
}

const MenueItem: React.FC<PropsWithChildren<MenueItemProps>> = ({children, className, onClick}) => {
  return (
    <div className={`flex justify-center items-center rounded-md border-border text-copy-primary border-2 w-[40px] h-[40px] ${className} cursor-pointer`} 
    onClick={onClick}
    >
      {children}
    </div>
  )
}

export default MenueItem
