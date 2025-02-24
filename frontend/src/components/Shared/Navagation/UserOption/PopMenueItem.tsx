"use client";

import UserPopupContext from "@/context/UserPopupContext";
import { PropsWithChildren, useContext } from "react";

interface PopMenueItemProps {
  title: string;
  onClick: () => void;
}

const PopMenueItem: React.FC<PropsWithChildren<PopMenueItemProps>> = ({
  children,
  title,
  onClick,
}) => {
  const userPopupContext = useContext(UserPopupContext);
  return (
    <div
      className="flex justify-start items-center gap-3 hover:bg-cat-pop h-8 text-copy-primary py-5 px-2 cursor-pointer"
      onClick={() => {
        onClick();
        userPopupContext?.onClose();
      }}
    >
      {children}
      <p className="">{title}</p>
    </div>
  );
};

export default PopMenueItem;
