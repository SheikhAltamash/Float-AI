import React from "react";
import WelcomeSection from "./WelcomeSection";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import DataControls from "./DataControls";
import "./styles/ChatArea.css";

function ChatArea({
  messages,
  onSendMessage,
  isLoading,
  selectedDataType,
  selectedVisualization,
  onDataTypeChange,
  onVisualizationChange,
  isSidebarCollapsed,
}) {
  const showWelcome = messages.length <= 1;

  return (
    <>
      <div
        className={`chat-area ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
      >
        <div className="chat-container">
          {/* Data Controls */}
          {/* <DataControls
            selectedDataType={selectedDataType}
            selectedVisualization={selectedVisualization}
            onDataTypeChange={onDataTypeChange}
            onVisualizationChange={onVisualizationChange}
          /> */}

          {/* Chat Content */}
          <div className="chat-content">
            {showWelcome ? (
              <WelcomeSection onSendMessage={onSendMessage} />
            ) : (
              <MessageList messages={messages} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>

      {/* Input Area - Centered and Independent */}
      <InputArea
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </>
  );
}

export default ChatArea;
