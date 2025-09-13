import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import FixedLogo from "./common/Logo";
import CustomScrollbar from "./common/CustomScroller";
import { useChatHistory } from "./hooks/useChatHistory";
import "./styles/ChatPage.css";

function ChatPage() {
  const [selectedDataType, setSelectedDataType] = useState("temperature");
  const [selectedVisualization, setSelectedVisualization] = useState("line");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    conversations,
    currentConversationId,
    messages,
    createNewConversation,
    switchConversation,
    addMessage,
    isLoading,
  } = useChatHistory();

  return (
    <div className="chat-page">
      <FixedLogo />
      <CustomScrollbar />
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewConversation={createNewConversation}
        onSwitchConversation={switchConversation}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <ChatArea
        messages={messages}
        onSendMessage={addMessage}
        isLoading={isLoading}
        selectedDataType={selectedDataType}
        selectedVisualization={selectedVisualization}
        onDataTypeChange={setSelectedDataType}
        onVisualizationChange={setSelectedVisualization}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </div>
  );
}

export default ChatPage;
