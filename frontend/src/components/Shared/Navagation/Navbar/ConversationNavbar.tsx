"use client";
import useConversationUser from "@/hooks/useConversationUser ";
import Avatar, { AvatarSize } from "../../Avatar";
import NavbarUserOption from "../UserOption/NavbarUserOption";
import { useConversationStore } from "@/zustand/useConversationStore";


const ConversationNavbar = () => {
  const { selectedConversation } = useConversationStore();
  if (!selectedConversation) {
    return "";
  }

  const { receiverUsers, receiverUser, isOnline } = useConversationUser({
    conversation: selectedConversation,
  });

  return (
<nav className="w-full h-14 border-2 border-border rounded-md flex items-center px-2">
      <div className="flex-1 flex items-center min-w-0"> {/* min-w-0 prevents flex child from expanding */}
        <div className="relative flex-shrink-0"> {/* flex-shrink-0 prevents avatar from shrinking */}
          <Avatar 
            size={AvatarSize.extralarge} 
            profileSrc={selectedConversation?.name ? "/images/group.png" : receiverUser?.profileImageSrc} 
          />
          {isOnline && (
            <span className="w-3 h-3 rounded-full bg-green-700 absolute left-[65%] top-[71%]" />
          )}
        </div>
        
        <div className="flex flex-col ml-2 min-w-0"> {/* min-w-0 allows text truncation to work */}
          <p className="text-copy-primary truncate">
            {selectedConversation?.name || receiverUser?.fullName}
          </p>
          
          {selectedConversation?.name && (
            <p className="text-xs text-copy-secondary truncate max-w-[200px] md:max-w-[280px] lg:max-w-[800px]">{receiverUsers?.map(user => {
              return `${user.userName}, `
            })}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex-shrink-0"> {/* Prevents NavbarUserOption from shrinking */}
        <NavbarUserOption />
      </div>
    </nav>
  );
};

export default ConversationNavbar;
