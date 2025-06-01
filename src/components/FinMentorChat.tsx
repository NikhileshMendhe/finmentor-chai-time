
import React, { useState, useRef, useEffect } from 'react';
import { Send, Calculator, Lightbulb, User, TrendingUp, FileCheck, Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface FinMentorChatProps {
  onPersonaChange: (persona: string) => void;
  currentPersona: string;
}

const FinMentorChat: React.FC<FinMentorChatProps> = ({ onPersonaChange, currentPersona }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm FinMentor, your friendly CA companion! 👋 Whether you need help with taxes, investments, or just want to chat about money matters, I'm here for you. What's on your financial mind today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const personas = [
    { id: 'ca', name: 'CA Expert', icon: FileCheck, description: 'Tax & Compliance' },
    { id: 'advisor', name: 'Advisor', icon: TrendingUp, description: 'Investment Guidance' },
    { id: 'auditor', name: 'Auditor', icon: User, description: 'Financial Review' }
  ];

  const getPersonaPrompt = (persona: string) => {
    const prompts = {
      ca: "You are FinMentor, a highly skilled and friendly Chartered Accountant. Focus on Indian tax laws, GST, compliance, and accounting. Explain complex concepts with analogies and real-life examples. Be conversational and witty.",
      advisor: "You are FinMentor in Investment Advisor mode. Focus on mutual funds, SIP, portfolio management, and investment strategies for Indian markets. Use simple explanations and practical examples.",
      auditor: "You are FinMentor in Auditor mode. Focus on financial review, audit processes, compliance checks, and financial statement analysis. Be thorough but friendly in your explanations."
    };
    return prompts[persona as keyof typeof prompts] || prompts.ca;
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved locally and FinMentor is ready to chat!",
      });
    }
  };

  const callGeminiAPI = async (message: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${getPersonaPrompt(currentPersona)}\n\nUser question: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key first.",
        variant: "destructive"
      });
      setShowApiKeyInput(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await callGeminiAPI(inputMessage);
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from Gemini API. Please check your API key.",
        variant: "destructive"
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please check your API key and try again.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* API Key Input Section */}
      {showApiKeyInput && (
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Key size={16} className="text-purple-400" />
            <h3 className="text-sm font-medium text-gray-300">Enter your Gemini API Key</h3>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="bg-gray-700 border-gray-600 text-white pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
            </div>
            <Button onClick={handleApiKeySubmit} className="bg-purple-600 hover:bg-purple-700">
              Save
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Your API key is stored locally in your browser. Get one from{' '}
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              Google AI Studio
            </a>
          </p>
        </div>
      )}

      {/* Persona Selector */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-300">Choose your FinMentor mode:</h3>
          {apiKey && !showApiKeyInput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiKeyInput(true)}
              className="text-gray-400 hover:text-white"
            >
              <Key size={14} className="mr-1" />
              API Key
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {personas.map((persona) => (
            <Button
              key={persona.id}
              variant={currentPersona === persona.id ? "default" : "outline"}
              size="sm"
              onClick={() => onPersonaChange(persona.id)}
              className={`flex items-center gap-2 ${
                currentPersona === persona.id 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'border-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <persona.icon size={16} />
              <div className="text-left">
                <div className="text-xs font-medium">{persona.name}</div>
                <div className="text-xs opacity-75">{persona.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-75 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about finance, taxes, investments..."
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinMentorChat;
