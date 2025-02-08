"use client";

import Image from "next/image";
import image from "../../../public/image/avatar.png";
export enum AvatarSize {
  extrasmall = 10,
  small = 20,
  medium = 30,
  large = 40,
  extralarge = 42,
}

interface AvatarProps {
  profileSrc?: string;
  onClick?: () => void;
  className?: string;
  size?: AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({
  profileSrc,
  onClick,
  className,
  size = AvatarSize.medium,
}) => {
  return (
    <div
    style={{
      height:`${size}px !important`,
      width:`${size}px !important`
    }}
    >
          <Image
      alt="Profile img"
      src={profileSrc ? profileSrc : "/images/avatar.png"}
      height={size}
      width={size}
      className={`rounded-full object-cover ${
        onClick && "cursor-pointer"
      } ${className} border-border border-2`}
      onClick={onClick}
    />
    </div>
  );
};

export default Avatar;
