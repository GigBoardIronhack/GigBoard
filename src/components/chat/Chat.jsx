import { useCallback, useEffect, useRef, useState } from "react";
import { getChatService, sendMessageService } from "../../services/chat.service";
import { getCurrentUserService, getUserService } from "../../services/auth.service";

const Chat = ({chatId}) => {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null)



  const handleChange = (e) => {
    setMessage(e.target.value);
  }


  const getChat = useCallback(() => {
    getChatService(chatId)
      .then((response) => {
        console.log(response)
        console.log("ChAAAAATTTT",response)
        setChat(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [chatId]);

  const createMessage = (e) => {
    e.preventDefault();

    sendMessageService(chatId, message)
      .then((response) => {
        setMessage("");
        getChat();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getChat();

    intervalRef.current = setInterval(() => {
      getChat();
    }, 2000);
  }, [getChat]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          Chat ID: {chat?.id}
          <h5 className="card-title mt-3">Participants</h5>
          <ul className="list-group list-group-flush">
            {chat?.participants.map((participant, index) => (
              <li key={index} className="list-group-item">
                {participant.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title">Messages</h5>

          <ul className="list-group list-group-flush">
            {chat?.messages.map((message, index) => (
              <li key={index} className="list-group-item">
             { console.log("mensajeeeeeeeeeeeeeeee",message)}
                <strong>Sender:</strong> {message.sender === chat?.participants[0].id ? chat?.participants[0].name :  chat?.participants[1].name} <br />
                <strong>Text:</strong> {message.text} <br />
                <strong>Created At:</strong> {message.createdAt}
              </li>
            ))}
          </ul>

        </div>
        <div className="chat-form">
          <form onSubmit={createMessage}>
            <div className="form-group p-4">
              <label htmlFor="message">Message</label>
              <textarea onChange={handleChange} value={message} type="text" className="form-control" id="message" height="300" />
            </div>
            <div className="text-center pb-5">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
