"use client"
import { createContext, PropsWithChildren, useState } from "react";

interface UserPopupContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UserPopupContext = createContext<UserPopupContextProps | null>(null);

export const UserPopupContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <UserPopupContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </UserPopupContext.Provider>
  );
};

export default UserPopupContext;
