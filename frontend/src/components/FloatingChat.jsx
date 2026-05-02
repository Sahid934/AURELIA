import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import './FloatingChat.css';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Good day. I am AURELIA's personal concierge. How may I assist you with our collection today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      // Simulate slight delay for natural feel
      setTimeout(() => {
        setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I apologize, but I am having trouble connecting at the moment. Please try again later.", isBot: true }]);
        setIsTyping(false);
      }, 800);
    }
  };

  return (
    <div className="floating-chat-container">
      {isOpen ? (
        <div className="chat-window animate-fade-in">
          <div className="chat-header">
            <div>
              <h3>AURELIA Concierge</h3>
              <span className="status">Online</span>
            </div>
            <button className="icon-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-bubble ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message-bubble bot typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()} className="send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle-btn animate-fade-in" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default FloatingChat;
