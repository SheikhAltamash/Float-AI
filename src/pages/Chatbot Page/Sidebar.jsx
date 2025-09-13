import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Sidebar.css";

function Sidebar({
  conversations,
  currentConversationId,
  onNewConversation,
  onSwitchConversation,
  isCollapsed,
  onToggleCollapse,
}) {
  return (
    <motion.div
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      animate={{ width: isCollapsed ? "50px" : "280px" }}
      transition={{ duration: 0.3 }}
    >
      {/* Collapsed State - Only Arrow */}
      {isCollapsed ? (
        <div className="collapsed-sidebar">
          <button
            className="expand-sidebar-btn"
            onClick={onToggleCollapse}
            title="Expand sidebar"
          >
            <span className="expand-arrow">→</span>
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-link">
                <span className="logo-text">Ocean Insights</span>
              </div>
            </div>
            <button
              className="collapse-sidebar-btn"
              onClick={onToggleCollapse}
              title="Collapse sidebar"
            >
              ←
            </button>
          </div>

          {/* New Chat Button */}
          <motion.button
            className="new-chat-btn"
            onClick={onNewConversation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="plus-icon">+</span>
            <span>New Chat</span>
          </motion.button>

          {/* Chat History */}
          <div className="chat-history">
            {conversations.length > 0 && (
              <div className="history-content">
                <div className="history-group">
                  <div className="history-group-title">TODAY</div>
                  {conversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      className={`conversation-item ${
                        conversation.id === currentConversationId
                          ? "active"
                          : ""
                      }`}
                      onClick={() => onSwitchConversation(conversation.id)}
                      whileHover={{ x: 4 }}
                    >
                      <div className="conversation-title">
                        {conversation.title || "New Conversation"}
                      </div>
                      <div className="conversation-preview">
                        {conversation.lastMessage}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom User Info */}
          <div className="sidebar-bottom">
            <div className="user-info">
              <div className="user-avatar">
                <span>M</span>
              </div>
              <span className="user-name">Ocean Explorer</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Sidebar;
