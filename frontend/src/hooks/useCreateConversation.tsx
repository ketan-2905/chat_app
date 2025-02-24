"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthUser } from "../../lib/types";
import API from "../../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AddUserMoadalContex from "@/context/AddUserMoadalContex";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useConversationStore } from "@/zustand/useConversationStore";

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  
  const router = useRouter();
  const addUserModalContext = useContext(AddUserMoadalContex);
  const {authUser}= useContext(AuthContext)
  const  {conversations,addConversation}= useConversationStore()

  const userConversations = useMemo(() => {
    return conversations.filter(conversation => conversation.participatonIds.length === 2);
  }, [conversations]);
  
  const reciverUserIds = useMemo(() => {
    return userConversations.map(userConversation => 
      userConversation.participatonIds.find(id => id !== authUser?.id) // `find` is cleaner
    ).filter(Boolean); // Removes any `undefined` values
  }, [userConversations, authUser?.id]);

  useEffect(() => {
    // Cancel previous request before making new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // If search is empty, reset users and return
    if (!search.trim()) {
      addUserModalContext?.setUsers([]);
      return;
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    const searchUsers = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({ search });
        addUserModalContext?.groupUsers.forEach((user) => queryParams.append("exclude", user.userName));

        const res = await API.get(`/user/getSearchUsers?${queryParams.toString()}&exclude=${authUser?.userName}`, {
          signal: abortControllerRef.current!.signal
        });
        addUserModalContext?.setUsers(res.data || []);        
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          const errorMessage = error.response?.data?.message || error.message;
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(searchUsers, 300);

    return () => {
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [search, addUserModalContext?.groupUsers]);

  const createConversation = useCallback(
    async (userId: string) => {
      if(reciverUserIds.includes(userId)){
        // Allow the user to open the conversation
        addUserModalContext?.onClose()
        return;
      }
      try {
        const conversation = await API.post(`/conversation/createConversation/${userId}`);
        addConversation(conversation.data)
        addUserModalContext?.onClose();
        toast.success("Coversation created Successfully")
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      }
    },
    [router, addUserModalContext]
  );

  const createGroupConversation = useCallback(
    async (groupName: string) => {
      try {
        await API.post('/conversation/createGroupConversation', {
          receiverIds: addUserModalContext?.groupUsers.map(user => user.id),
          name: groupName
        });
        router.refresh();
        addUserModalContext?.onClose();
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      }
    },
    [addUserModalContext?.groupUsers, router, addUserModalContext]
  );

  const addUserToGroup = useCallback((user: AuthUser) => {
    addUserModalContext?.setGroupUsers(prev => [...prev, { userName: user.userName, id: user.id }]);
  }, []);

  const removeUserFromGroup = useCallback((userName: string) => {
    addUserModalContext?.setGroupUsers(prev => prev.filter(groupUser => groupUser.userName !== userName));
  }, []);

  const returnValue = useMemo(() => ({
    loading,
    search,
    setSearch,
    setUserId,
    addUserToGroup,
    removeUserFromGroup,
    createConversation,
    createGroupConversation,
  }), [
    loading,
    search,
    addUserToGroup,
    removeUserFromGroup,
    createConversation,
    createGroupConversation
  ]);

  return returnValue;
};

export default useCreateConversation;