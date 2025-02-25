import { createHttp } from "./base.service";

const authenticatedHttp = createHttp(true);

export const createChatService = (userId) =>
  authenticatedHttp.post("/chats", { userId });

export const getChatService = (chatId) =>
  authenticatedHttp.get(`/chats/${chatId}`);

export const getChatsService = () => authenticatedHttp.get("/chats");

export const sendMessageService = (chatId, text) =>
  authenticatedHttp.post(`/chats/messages/create`, { chatId, text });

export const deleteChat = (chatId) => authenticatedHttp.delete(`/chats/${chatId}`)
    