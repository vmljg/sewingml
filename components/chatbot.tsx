"use client";

import { useChat } from "@ai-sdk/react";

function Spinner() {
  return <div>Loading...</div>;
}

export default function Chatbot() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    reload,
    error,
  } = useChat({
    streamProtocol: "text",
  });

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, index) => {
            // text parts:
            if (part.type === "text") {
              return <div key={index}>{part.text}</div>;
            }

            // reasoning parts:
            if (part.type === "reasoning") {
              return (
                <pre key={index}>
                  {part.details.map((detail) =>
                    detail.type === "text" ? detail.text : "<redacted>"
                  )}
                </pre>
              );
            }
          })}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div>
          {status === "submitted" && <Spinner />}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {status === "error" && (
        <div>
          <div>Error: {error?.message}</div>
          <button type="button" onClick={() => reload()}>
            Reload
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={status !== "ready"}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
