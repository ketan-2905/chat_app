"use client";
import AddUserMoadalContex from "@/context/AddUserMoadalContex";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import AddUser from "./AddUser";
import CreateGroup from "./CreateGroup";
import useCreateConversation from "@/hooks/useCreateConversation";

const AddUserModal = () => {
  const addUserModalContext = useContext(AddUserMoadalContex);
  const [choice, setChoice] = useState<"user" | "group">("user");
  const { setSearch} = useCreateConversation();
  const addUserMoadalContex = useContext(AddUserMoadalContex)

  useEffect(() => {
    return () => {
      setSearch(''); // Reset search when modal closes
      addUserMoadalContex?.setUsers([]) // Reset users when modal closes
    };
  }, [setSearch, addUserMoadalContex?.setUsers]);

  return addUserModalContext?.isOpen ? (
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 p-2 bg-modal-background z-50 w-[100%] md:w-[60%] rounded-md">
      <div className="flex justify-between items-center text-copy-primary mb-2">
        <h1>Create Conversation</h1>
        <X
          className="h-7 w-7 cursor-pointer"
          onClick={addUserModalContext?.onClose}
        />
      </div>
      <div className="flex justify-between items-center gap-2 text-copy-primary">
        <button
          className={`border-2 border-border bg-background px-2 py-1 w-[50%] ${
            choice === "user" ? "bg-cta-active" : ""
          }`}
          onClick={() => setChoice("user")}
        >
          Chat with User
        </button>
        <button
          className={`border-2 border-border bg-background px-2 py-1 w-[50%] ${
            choice === "group" ? "bg-cta-active" : ""
          }`}
          onClick={() => setChoice("group")}
        >
          Create Group Chat
        </button>
      </div>
      <div>{choice === "user" ? <AddUser /> : <CreateGroup />}</div>
    </div>
  ) : null;
};

export default AddUserModal;