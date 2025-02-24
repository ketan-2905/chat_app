"use client"
import { useEffect, useState } from 'react';
import { useSocketContext } from "@/context/SocketContext";
import {Conversation, AuthUser } from "../../lib/types"; // Adjust the import path as needed
import getUser from '@/actions/getUser';
import { useAuthContext } from '@/context/AuthContext';
import getUsers from '@/actions/getUsers';

interface UseConversationUserProps {
  conversation: Conversation;
}


interface UseConversationUserReturn {
  receiverUser: AuthUser | null;
  receiverUsers: AuthUser[] | null;
  isOnline: boolean;
  isLoading: boolean;
  error: Error | null;
}

const useConversationUser = ({conversation}: UseConversationUserProps): UseConversationUserReturn => {
  // States
  const [receiverUser, setReceiverUser] = useState<AuthUser | null>(null);
  const [receiverUsers, setReceiverUsers] = useState<AuthUser[]>([]);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Context values
  const { onlineUsers } = useSocketContext();
  const {authUser} = useAuthContext()

  useEffect(() => {
    const fetchUser = async () => {
      if(conversation.name){
        try {
          setIsLoading(true);
          
          // Find receiver ID
          const receiverIds = conversation?.participatonIds.filter(
            (participatonId) => participatonId !== authUser?.id
          );
  
          if (!receiverIds) {
            throw new Error('Receiver not found in conversation');
          }
  
          // Fetch user data
          const users = await getUsers(receiverIds);
          
          if (!users) {
            throw new Error('User not found');
          }
  
          // Update states
          setReceiverUsers(users);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch user'));
        } finally {
          setIsLoading(false);
        }
      }else{
        try {
          setIsLoading(true);
          
          // Find receiver ID
          const receiverId = conversation?.participatonIds.find(
            (participatonId) => participatonId !== authUser?.id
          );
  
          if (!receiverId) {
            throw new Error('Receiver not found in conversation');
          }
  
          // Fetch user data
          const user = await getUser(receiverId);
          
          if (!user) {
            throw new Error('User not found');
          }
  
          // Update states
          setReceiverUser(user);
          setIsOnline(onlineUsers.includes(receiverId));        
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch user'));
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, [conversation?.id, authUser?.id, onlineUsers]); // Added conversation.id as dependency

  // Update online status whenever onlineUsers changes
  useEffect(() => {
    if (receiverUser) {
      setIsOnline(onlineUsers.includes(receiverUser.id));
    }
  }, [onlineUsers, receiverUser]);

  return {
    receiverUser,
    isOnline,
    isLoading,
    error,
    receiverUsers
  };
};

export default useConversationUser;
