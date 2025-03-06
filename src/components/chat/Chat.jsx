/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import { getChatService, sendMessageService } from "../../services/chat.service";

const Chat = ({ chatId }) => {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getChat = useCallback(() => {
    if (!chatId) {
      return;
    }
    getChatService(chatId)
      .then((response) => {
        if (!chatId) return console.log("No hay chat");
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
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [getChat]);

  return (
    <div className="flex justify-center items-center row-span-5 lg:row-start-1 lg:col-start-2 bg-whiterounded-lg p-6">
      
      <div className="w-2/3 max-w-md h-[90vh] bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
  
        {/* 🏆 Título del chat */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 text-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Chat ID: {chat?.id}
          </h1>
          <h5 className="text-sm text-gray-600 dark:text-gray-300">
            {chat?.participants.map((p) => p.name).join(", ")}
          </h5>
        </div>
  
        {/* 💬 Cuerpo del chat (mensajes) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {chat?.messages.map((message, index) => {
            const isSender = message.sender === chat?.participants[0].id;
            return (
              <div
                key={index}
                className={`p-3 rounded-lg shadow-sm text-sm ${
                  isSender
                    ? "bg-blue-500 text-white self-end ml-auto w-fit"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 self-start mr-auto w-fit"
                }`}
              >
                <strong>{isSender ? chat?.participants[0].name : chat?.participants[1].name}</strong>:{" "}
                {message.text}
                <p className="text-xs opacity-70 mt-1">{message.createdAt}</p>
              </div>
            );
          })}
        </div>
  
        {/* 📝 Formulario de mensaje */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
          <form onSubmit={createMessage} className="flex flex-col">
            <textarea
              onChange={handleChange}
              value={message}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white resize-none"
              placeholder="Escribe un mensaje..."
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
            >
              Enviar
            </button>
          </form>
        </div>
  
      </div>
  
    </div>
  );
  
};

export default Chat;
