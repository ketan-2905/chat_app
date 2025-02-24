"use client"
import { createContext, PropsWithChildren, useState } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const SidebarContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen(prev => !prev),
        onClose: () => setIsOpen(false)
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
