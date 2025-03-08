/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import { getChatService, sendMessageService } from "../../services/chat.service";

const Chat = ({ chatId }) => {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);
  const messagesEndRef = useRef(null); // Ref para hacer scroll al último mensaje

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getChat = useCallback(() => {
    if (!chatId) return;
    getChatService(chatId)
      .then((response) => {
        setChat(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [chatId]);

  const createMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");

    try {
      await sendMessageService(chatId, message);
      getChat();
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  useEffect(() => {
    getChat();
    intervalRef.current = setInterval(() => {
      getChat();
    }, 2000);
    return () => clearInterval(intervalRef.current);
  }, [getChat]);

  // Hacer scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div className="w-full max-w-lg h-[65vh] max-h-[65vh] bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
        
        {/* 🏆 Título del chat */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 text-center">
          <h1 className="text-lg font-semibold text-black-800 dark:text-white">
            Chat {chat?.id}
          </h1>
          <h5 className="text-sm text-black-600 dark:text-black-300 truncate">
            {chat?.participants?.map((p) => p.name).join(", ") || "No participants"}
          </h5>
        </div>

        {/* 💬 Cuerpo del chat (mensajes) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {chat?.messages?.map((message, index) => {
            const isSender = message.sender === chat?.participants?.[0]?.id;
            return (
              <div
                key={index}
                className={`p-3 rounded-lg shadow-sm text-sm max-w-[80%] ${
                  isSender
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 dark:bg-gray-700 text-black-900 dark:text-black-300 self-start mr-auto"
                }`}
              >
                <strong>{isSender ? chat?.participants?.[0]?.name : chat?.participants?.[1]?.name}</strong>:{" "}
                {message.text}
                <p className="text-xs opacity-70 mt-1">{new Date(message.createdAt).toLocaleTimeString()}</p>
              </div>
            );
          })}
          {/* 🔽 Esto nos permite hacer scroll al último mensaje automáticamente */}
          <div ref={messagesEndRef} />
        </div>

        {/* 📝 Formulario de mensaje */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
          <form onSubmit={createMessage} className="flex">
            <input
              type="text"
              onChange={handleChange}
              value={message}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              placeholder="Escribe un mensaje..."
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
            >
              ➤
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Chat;
