import React from "react";
import ChartRenderer from "./charts/ChartRenderer";
import "./styles/MessageList.css";

function MessageItem({ message }) {
  const hasChart = message.data && message.chartType;

  return (
    <div className={`message ${message.type}-message`}>
      <div className="message-content">
        <p>{message.content}</p>

        {hasChart && (
          <div className="chart-section">
            <ChartRenderer
              data={message.data}
              initialChartType={message.chartType}
              messageContent={message.content}
              title={message.data?.title || "Ocean Data"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageItem;
