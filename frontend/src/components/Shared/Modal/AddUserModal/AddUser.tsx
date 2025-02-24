"use client";
import React, { useContext } from "react";
import UserNameInput from "./UserNameInput";
import SearchUserCard from "../../SearchUserCard";
import useCreateConversation from "@/hooks/useCreateConversation";
import Loader from "../../Loader";
import AddUserMoadalContex from "@/context/AddUserMoadalContex";

const AddUser = () => {
  const {loading, search, createConversation } = useCreateConversation();
  const addUserModalContext = useContext(AddUserMoadalContex)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-52">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <UserNameInput />
      <div className="custom-scrollbar h-52 overflow-y-auto">
        {addUserModalContext?.users?.length > 0 ? (
          addUserModalContext?.users.map((user) => (
            <SearchUserCard
              key={user.id}
              userName={user.userName}
              id={user.id}
              fullName={user.fullName}
              profileImageSrc={user.profileImageSrc}
              onClick={() => createConversation(user.id)}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            {search ? 'No users found' : 'Type to search users'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;