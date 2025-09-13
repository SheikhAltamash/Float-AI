import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import FixedLogo from "./common/Logo";
import CustomScrollbar from "./common/CustomScroller";
import MobileMenuToggle from "./MobileMenuToggle";
import { useChatHistory } from "./hooks/useChatHistory";
import "./styles/ChatPage.css";

function ChatPage() {
  const [selectedDataType, setSelectedDataType] = useState("temperature");
  const [selectedVisualization, setSelectedVisualization] = useState("line");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    conversations,
    currentConversationId,
    messages,
    createNewConversation,
    switchConversation,
    addMessage,
    isLoading,
  } = useChatHistory();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="chat-page">
      <FixedLogo />
      <CustomScrollbar />

      {/* Mobile Menu Toggle */}
      <MobileMenuToggle
        isOpen={isMobileMenuOpen}
        onToggle={handleMobileMenuToggle}
      />

      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={handleSidebarOverlayClick}
      />

      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewConversation={createNewConversation}
        onSwitchConversation={(id) => {
          switchConversation(id);
          setIsMobileMenuOpen(false); // Close mobile menu when switching
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
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
