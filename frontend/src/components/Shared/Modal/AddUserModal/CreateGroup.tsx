"use client"
import UserNameInput from "./UserNameInput";
import useCreateConversation from "@/hooks/useCreateConversation";
import SearchUserCard from "../../SearchUserCard";
import { X } from "lucide-react";
import AddUserMoadalContex from "@/context/AddUserMoadalContex";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const CreateGroup = () => {
  const { addUserToGroup, removeUserFromGroup,  createGroupConversation } = useCreateConversation();
  const addUserMoadalContex = useContext(AddUserMoadalContex);
  const [groupName, setGroupName] = useState('')

  const handleCreateGroup = () => {
    if(!groupName){
      toast.error("please enter Group name to create group")
      return
    }
    createGroupConversation(groupName)
  }
  return (
    <div className="w-[100%] felx flex-col justify-start items-start gap-2">
      <UserNameInput />
      <div className="custom-scrollbar h-52 overflow-y-auto ">
        {addUserMoadalContex?.users.map((user) => {
          return (
            <SearchUserCard
              key={user.id}
              userName={user.userName}
              id={user.id}
              fullName={user.fullName}
              profileImageSrc={user.profileImageSrc}
              onClick={() => {
                addUserToGroup(user);
              }}
            />
          );
        })}
      </div>
      <div className="w-[100%] flex gap-1 flex-wrap border-border border-1 custom-scrollbar h-auto max-h-28 overflow-y-auto">
        {addUserMoadalContex?.groupUsers.map((groupUser) => {
          return (
            <div
              key={groupUser.id}
              className="text-xs rounded-md bg-yellow-600 flex justify-between items-center text-copy-primary p-1"
              onClick={() => removeUserFromGroup(groupUser.userName)}
            >
              {groupUser.userName}
              <X className="h-5 w-5 cursor-pointer" />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-start items-start gap-2 text-copy-primary mt-3">
          <label htmlFor="userName">Group name</label>
          <div className="flex gap-2 items-center">
            <input
              id="userName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter username"
              className="border-2 border-border bg-background px-2 py-1"
            />
          </div>
        </div>
      <button className=" mt-2 text-copy-primary border-2 border-border rounded-md bg-background px-2 py-1 hover:bg-hover" onClick={handleCreateGroup}>
        Create Group Conversation
      </button>
    </div>
  );
};

export default CreateGroup;
