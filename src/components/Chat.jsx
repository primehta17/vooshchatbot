import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import '../styles/Chat.scss';

function Chat({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const esRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    // fetch session history when component mounts
    fetch(`https://vooshchatbot-backend.onrender.com/api/chat/session/${sessionId}/history`)
      .then(r => r.json())
      .then(data => setMessages(data || []))
      .catch(() => { /* ignore */ });

    return () => {
      if (esRef.current) esRef.current.close();
    };
  }, [sessionId]);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (text) => {
    // append user message locally
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    // close previous eventsource
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }

    // build GET url for EventSource (EventSource only supports GET)
    const url = `https://vooshchatbot-backend.onrender.com/api/chat/stream?sessionId=${sessionId}&message=${encodeURIComponent(text)}`;
    const es = new EventSource(url);
    esRef.current = es;

    let assistantAccum = '';

    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.delta) {
          assistantAccum += data.delta;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', text: assistantAccum }];
            } else {
              return [...prev, { role: 'assistant', text: assistantAccum }];
            }
          });
        }
      } catch (err) {
        console.error('SSE parse error', err);
      }
    };

    es.addEventListener('done', () => {
      setLoading(false);
      es.close();
      esRef.current = null;
    });

    es.addEventListener('error', (e) => {
      console.error('SSE error', e);
      setLoading(false);
      es.close();
      esRef.current = null;
      setMessages(prev => [...prev, { role: 'assistant', text: '[Error receiving response]' }]);
    });
  };

  const handleReset = async () => {
    await fetch(`https://vooshchatbot-backend.onrender.com/api/chat/session/${sessionId}/reset`, { method: 'POST' });
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <div className="chat-actions">
        <button onClick={handleReset}>Reset Session</button>
        {loading && <span className="chat-loading">Streaming...</span>}
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.role}`}>
            <div className="chat-message__content">{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default Chat;
