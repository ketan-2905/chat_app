import React from "react";
import Avatar, { AvatarSize } from "../../Avatar";

const ConversationCard = () => {
  return (
    <div className="flex justify-center items-center gap-2 border-2 border-border bg-background m-2 rounded-md p-1 hover:bg-cta-background cursor-pointer">
      <div className="w-[15%]">
      <Avatar  size={AvatarSize.extralarge} />
      </div>
      <div className="flex justify-between items-center w-[85%] px-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-copy-primary text-base">User Name</h1>
          <span className="text-copy-secondary text-sm">Recent msg</span>
        </div>
        {/* unreaded message count is greater than zero then show the beloved element */}
        <span className="bg-sky-600 px-2 text-white rounded-md text-base">
          5
        </span>
      </div>
    </div>
  );
};

export default ConversationCard;
