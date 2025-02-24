"use client"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { AuthUser } from "../../lib/types";

type GroupUser = {
  userName: string;
  id: string;
}

interface AddUserMoadalContexProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  users: AuthUser[];
  setUsers: Dispatch<SetStateAction<AuthUser[]>>;
  groupUsers: GroupUser[];
  setGroupUsers: Dispatch<SetStateAction<GroupUser[]>>;
  conversationUsers: GroupUser[];
  setConversationUsers: Dispatch<SetStateAction<GroupUser[]>>;
}

const AddUserMoadalContexDeafaulState: AddUserMoadalContexProps = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  users: [],
  setUsers: () => {},
  groupUsers: [],
  setGroupUsers: () => {},
  conversationUsers: [],
  setConversationUsers: () => {},
}

const AddUserMoadalContex = createContext<AddUserMoadalContexProps>(AddUserMoadalContexDeafaulState);

export const AddUserMoadalContexProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [groupUsers, setGroupUsers] = useState<GroupUser[]>([]);
  const [conversationUsers, setConversationUsers] = useState<GroupUser[]>([]);


  return (
    <AddUserMoadalContex.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        users,
        setUsers,
        groupUsers,
        setGroupUsers,
        conversationUsers,
        setConversationUsers
      }}
    >
      {children}
    </AddUserMoadalContex.Provider>
  );
};

export default AddUserMoadalContex;
