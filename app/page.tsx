"use client";
import Image from "next/image";
// TODO: create a page that post the message to the fastapi app and return the response
import { useState } from 'react';


export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/py/chat', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    //console.log(data);
    setResponse(data.response);
    setMessage('');
  };
return (
  <div className="flex flex-col h-screen bg-gray-100">
    <div className="flex-1 overflow-y-auto p-4">
      {response && (
        <div className="bg-white rounded-lg p-4 shadow mb-4">
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
    
    <div className="border-t bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  </div>
)
}


