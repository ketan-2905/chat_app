"use Client";

import Avatar, { AvatarSize } from "./Avatar";

type SearchUserCardProps = {
    id: string;
    userName: string;
    fullName: string;
    profileImageSrc: string;
    onClick?: ()=>void;
};

const SearchUserCard: React.FC<SearchUserCardProps> = ({
  userName,
  profileImageSrc,
  id,
  fullName,
  onClick
}) => {
  return (
    <div className="px-2 py-1 felx justify-start items-center gap-2 hover:bg-hover flex cursor-pointer"
    onClick={onClick}>
        <Avatar profileSrc={profileImageSrc} size={AvatarSize.medium}/>
      <div className="felx flex-col justify-start items-start gap-2">
        {" "}
        <p className="text-base text-copy-primary">{fullName}</p>
        <p className="text-sm text-copy-secondary">@{userName}</p>
      </div>
    </div>
  );
};

export default SearchUserCard;
