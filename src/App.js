import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import "./styles/Chat.scss";

function App() {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    let sid = localStorage.getItem("sessionId");
    if (!sid) {
      sid = "sess_" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("sessionId", sid);
    }
    setSessionId(sid);
  }, []);

  if (!sessionId) return <div>Loading...</div>;

  return (
    <div className="app">
      <header className="app__header">
        <h1>RAG Chat - Demo</h1>
      </header>
      <main>
        <Chat sessionId={sessionId} />
      </main>
    </div>
  );
}

export default App;
