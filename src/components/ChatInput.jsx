import React, { useState } from 'react';

function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
  };
  return (
    <form className="chat-input" onSubmit={submit}>
      <input
        className="chat-input__field"
        placeholder="Message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button className="chat-input__send" type="submit" disabled={disabled}>Send</button>
    </form>
  );
}

export default ChatInput;
