import { useState } from "react";
import { sendChatMessage } from "../api";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Namaste! 🙏 Welcome to DesiBite. Ask me about our Punjabi and Gujarati menu."
    }
  ]);

  async function handleSend(e) {
    e.preventDefault();

    const question = message.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setMessage("");
    setLoading(true);

    try {
      const data = await sendChatMessage(question);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I couldn't connect right now. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-window">
          <div className="chat-header">
            <div>
              <strong>DesiBite Assistant</strong>
              <small>Menu help • Vegetarian food</small>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${item.role}`}
              >
                {item.text}
              </div>
            ))}

            {loading && <div className="chat-message bot">Thinking...</div>}
          </div>

          <form className="chat-form" onSubmit={handleSend}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about our food..."
            />
            <button type="submit" disabled={loading}>➤</button>
          </form>
        </section>
      )}

      <button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Open restaurant chat"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}

export default AIChat;