import React, { useState } from 'react';
import ServiceChat from '../services/service.chat';

function ChatComponent() {
  const [chat, setChat] = useState('');
  const [response, setResponse] = useState('');

  const handleChatChange = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (chat.trim().length === 0) {
      return;
    }

    try {
      const result = await ServiceChat.getChat({ chat });
      if (result.status === 200) {
        setResponse(result.result);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Chat:
          <input type="text" value={chat} onChange={handleChatChange} />
        </label>
        <button type="submit">Send</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
}

export default ChatComponent;