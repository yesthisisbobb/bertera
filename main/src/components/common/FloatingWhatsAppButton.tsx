
"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { MessageCircle, SendHorizonal, X, User, Loader2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { interactiveChatFlow } from '@/ai/flows/interactive-chat-flow';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

// Custom Terra "Tree Leaves" Logo SVG Component
const TerraLogo = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-5 w-5", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="3.5"/>
    <circle cx="8" cy="13" r="3.5"/>
    <circle cx="16" cy="13" r="3.5"/>
  </svg>
);


export function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [aiSuggestedWhatsappMessage, setAiSuggestedWhatsappMessage] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const phoneNumber = "6285156113241";
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && chatHistory.length === 0) {
      // Add initial greeting from AI (Terra) when chat opens for the first time
      setChatHistory([
        { id: Date.now().toString(), sender: 'ai', text: "Hello! I'm Terra, your AI assistant from Bertera Niaga Global. How can I help you with our 'forest friends' coffee today?" }
      ]);
    }
  };

  const handleSubmitQuery = async (e: FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || isLoadingAI) return;

    const newUserMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: userQuery };
    setChatHistory(prev => [...prev, newUserMessage]);
    setAiSuggestedWhatsappMessage(null); // Clear previous suggestion, hide WhatsApp button
    setUserQuery('');
    setIsLoadingAI(true);

    try {
      const response = await interactiveChatFlow({ userQuery: newUserMessage.text });
      const aiResponseMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: response.aiAnswer };
      setChatHistory(prev => [...prev, aiResponseMessage]);
      setAiSuggestedWhatsappMessage(response.suggestedWhatsappMessage);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorResponseMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setChatHistory(prev => [...prev, errorResponseMessage]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const message = aiSuggestedWhatsappMessage || "Hello Bertera Niaga Global, I'd like to learn more.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false); // Optionally close the chat widget
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleOpen}
          variant="default"
          className={cn(
            "fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl z-50 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          )}
          aria-label="Open Chat"
        >
          <MessageCircle size={30} />
        </Button>
      )}

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-80 sm:w-96 z-50 transition-all duration-300 ease-in-out transform",
          isOpen 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-10 scale-95 pointer-events-none" // pointer-events-none when hidden
        )}
      >
        {isOpen && ( // Conditionally render card only when open to ensure animations work correctly on mount/unmount
          <Card className="h-[70vh] max-h-[500px] shadow-2xl rounded-xl flex flex-col bg-card/80 dark:bg-card/80 backdrop-blur-lg border-border">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
              <CardTitle className="text-lg font-semibold text-primary flex items-center">
                <TerraLogo className="mr-2 text-primary h-5 w-5" /> Chat with Terra
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleOpen} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
                <span className="sr-only">Close chat</span>
              </Button>
            </CardHeader>
            
            <div className="flex-grow overflow-y-auto min-h-0"> {/* Added min-h-0 here */}
              <div ref={chatContainerRef} className="p-4 space-y-4">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-end gap-2 max-w-[85%]",
                      msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    )}
                  >
                    {msg.sender === 'ai' && <TerraLogo className="text-primary flex-shrink-0 mb-1 h-5 w-5" />}
                    {msg.sender === 'user' && <User size={20} className="text-accent flex-shrink-0 mb-1" />}
                    <div
                      className={cn(
                        "p-2.5 rounded-lg shadow text-sm",
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-card text-card-foreground rounded-bl-none'
                      )}
                    >
                      {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  </div>
                ))}
                {isLoadingAI && (
                  <div className="flex items-center gap-2 mr-auto max-w-[85%]">
                     <TerraLogo className="text-primary flex-shrink-0 mb-1 h-5 w-5" />
                     <div className="p-2.5 rounded-lg shadow bg-card text-card-foreground rounded-bl-none">
                      <Loader2 size={18} className="animate-spin text-muted-foreground" />
                     </div>
                  </div>
                )}
              </div>
            </div>

            <CardFooter className="p-3 border-t flex flex-col gap-2">
              {aiSuggestedWhatsappMessage && !isLoadingAI && (
                  <Button 
                      onClick={handleOpenWhatsApp} 
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                  >
                      <Phone size={16} className="mr-2"/> Learn More via WhatsApp
                  </Button>
              )}
              <form onSubmit={handleSubmitQuery} className="flex items-center gap-2 w-full">
                <Textarea
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-grow resize-none bg-input/70 border-border focus:ring-primary text-sm p-2.5 min-h-[40px] max-h-[100px]"
                  rows={1}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmitQuery(e);
                      }
                  }}
                  disabled={isLoadingAI}
                />
                <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0" disabled={isLoadingAI || !userQuery.trim()}>
                  {isLoadingAI ? <Loader2 size={18} className="animate-spin" /> : <SendHorizonal size={18} />}
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}

