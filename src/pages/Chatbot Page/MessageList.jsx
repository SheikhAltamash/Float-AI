import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageItem from "./MessageItems";
import LoadingIndicator from "./common/LoadingIndicator";
import "./styles/MessageList.css";

function MessageList({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      <AnimatePresence>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </AnimatePresence>

      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
