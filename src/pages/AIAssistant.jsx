import React, { useState, useRef, useEffect } from 'react';
import { RiSearchLine, RiBellLine, RiSendPlaneFill, RiLoader4Line } from 'react-icons/ri';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';

const DEFAULT_OPTIONS = [
  "Check my health records",
  "Find nearby medical facilities",
  "Create a training plan",
  "Get health advice",
  "Schedule an appointment"
];

const AIAssistant = () => {
  const { userType, userId } = useUser();
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm your AI health assistant. How can I help you today?",
      options: DEFAULT_OPTIONS
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      const userMessage = { role: 'user', content: inputMessage };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // Send message to backend
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          userId: userId
        })        
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate response');
      }

      // Add AI response to messages
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.data,
        options: DEFAULT_OPTIONS
      }]);
    } catch (error) {
      console.error('Chat Error:', error);
      // Log the specific error message if available
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Detailed Error:', errorMessage);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize, but I encountered an error processing your request. Please try again in a moment. (Details: ${errorMessage})`,
        error: true,
        options: DEFAULT_OPTIONS
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOptionClick = (option) => {
    setInputMessage(option);
    handleSendMessage();
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.error
                    ? 'bg-red-100 text-red-700'
                    : 'bg-white shadow-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.options && (
                  <div className="mt-4 space-y-2">
                    {message.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="border-t bg-white p-4">
          <div className="flex items-center space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className={`p-2 rounded-full ${
                isLoading || !inputMessage.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {isLoading ? (
                <RiLoader4Line className="w-5 h-5 animate-spin" />
              ) : (
                <RiSendPlaneFill className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;
