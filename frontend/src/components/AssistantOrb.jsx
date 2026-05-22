import { Bot, Send } from 'lucide-react';
import { useState } from 'react';

export function AssistantOrb() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Fitness intelligence online. Ask for workouts, diet, fatigue, or crowd predictions.' }
  ]);
  const [input, setInput] = useState('');

  async function send() {
    const text = input.trim();
    if (!text) return;
    
    // Add user message immediately
    const userMessage = { from: 'user', text };
    setMessages((old) => [...old, userMessage]);
    setInput('');
    
    try {
      const aiUrl = import.meta.env.VITE_AI_URL || 'http://localhost:5001/api/ai';
      const response = await fetch(`${aiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      
      const data = await response.json();
      setMessages((old) => [...old, { from: 'ai', text: data.reply || 'Error generating response.' }]);
    } catch (error) {
      setMessages((old) => [...old, { from: 'ai', text: 'Connection to AI Core failed. Is the backend running?' }]);
    }
  }

  return (
    <aside className="assistant-panel">
      <div className="flex items-center gap-3">
        <div className="assistant-core"><Bot size={20} /></div>
        <div>
          <p className="text-sm font-semibold text-white">AI Coach</p>
          <p className="text-xs text-cyan">Neural response engine</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {messages.slice(-4).map((message, index) => (
          <p key={index} className={message.from === 'ai' ? 'chat-ai' : 'chat-user'}>{message.text}</p>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder="Ask NexaFit AI..." />
        <button onClick={send} title="Send message"><Send size={16} /></button>
      </div>
    </aside>
  );
}
