import { create } from "zustand";
import API from "../../lib/axios";
import toast from "react-hot-toast";
import { ClientMessage, Conversation, ServerMessage } from "../../lib/types";
import { getMessagesFormated } from "@/utils/daySeparator";

interface ConversationStore {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: ServerMessage[];
  clientMessages: ClientMessage[];
  loading: boolean;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  addConversation: (conversation: Conversation) => void;
  setSelectedConversation: (conversation: Conversation) => void;
  setClientMessages: (messages: ClientMessage[]) => void;
  addMessage: (message: ServerMessage) => void;
  setInitialClientMessages: (message: ClientMessage[]) => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],
  loading: false, // Initial loading state
  clientMessages: [],

  fetchConversations: async () => {
    set({ loading: true });
    try {
      const response = await API.get("/conversation/getConversations");
      set({ conversations: response.data || [] });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchMessages: async (conversationId) => {
    try {
      const response = await API.get(`/message/${conversationId}`);
      set({ messages: response.data || [] });
      const formatedMessages = getMessagesFormated(response.data)
      set({clientMessages: formatedMessages})
    } catch (error: any) {
      toast.error(error.message);
    }
  },

  addConversation: (conversation) => {
    set((state) => ({
      conversations: [...state.conversations, conversation],
    }));
  },

  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation });
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setInitialClientMessages: (message) => {
    set((state) => ({
      clientMessages: [...state.clientMessages, ...message],
    }));
  },

  setClientMessages: (message) => {
    set((state) => ({
      clientMessages: [...state.clientMessages, ...message],
    }));
  },
}));
