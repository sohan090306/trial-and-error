import { Bot, Send } from 'lucide-react';
import { useState } from 'react';

export function AssistantOrb() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Fitness intelligence online. Ask for workouts, diet, fatigue, or crowd predictions.' }
  ]);
  const [input, setInput] = useState('');

  function send() {
    const text = input.trim();
    if (!text) return;
    let reply = 'I recommend a balanced strength block, high-protein nutrition, and recovery monitoring.';
    if (text.toLowerCase().includes('chest')) reply = 'Chest protocol: incline press, flat dumbbell press, cable fly, dips, push-up burnout.';
    if (text.toLowerCase().includes('calories')) reply = 'Start with bodyweight in kg x 28 for fat loss or x 34 for muscle gain, then adjust weekly.';
    setMessages((old) => [...old, { from: 'user', text }, { from: 'ai', text: reply }]);
    setInput('');
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
