import { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, X, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
const CHAT_ENDPOINT = 'https://faifa-gateway.a-alfaifi771.workers.dev/api/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatWidgetProps {
  fullHeight?: boolean;
}

// Detects Google Maps URLs (maps.google.com, google.com/maps, goo.gl/maps, maps.app.goo.gl)
const MAPS_URL_REGEX =
  /(https?:\/\/(?:www\.)?(?:google\.[a-z.]+\/maps[^\s)]*|maps\.google\.[a-z.]+\/[^\s)]*|maps\.app\.goo\.gl\/[^\s)]*|goo\.gl\/maps\/[^\s)]*))/gi;

const MapLinkButton = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 mt-2 px-3 py-2 rounded-xl bg-background/80 hover:bg-primary hover:text-primary-foreground border border-primary/30 text-primary text-xs font-medium shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
  >
    <MapPin className="w-4 h-4" />
    <span>الموقع على الخريطة</span>
  </a>
);

const renderMessageContent = (content: string) => {
  const parts: Array<{ type: 'text' | 'map'; value: string }> = [];
  let lastIndex = 0;
  const regex = new RegExp(MAPS_URL_REGEX);
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'map', value: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push({ type: 'text', value: content.slice(lastIndex) });
  }
  if (parts.length === 0) parts.push({ type: 'text', value: content });

  return (
    <>
      {parts.map((p, i) =>
        p.type === 'text' ? (
          <span key={i} className="whitespace-pre-wrap">{p.value}</span>
        ) : (
          <div key={i} className="block">
            <MapLinkButton url={p.value} />
          </div>
        )
      )}
    </>
  );
};

const AIChatWidget = ({ fullHeight = false }: AIChatWidgetProps) => {
  const [isExpanded, setIsExpanded] = useState(fullHeight);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'أهلا كيف اساعدك؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const isRequestInFlight = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isExpanded || fullHeight) {
      scrollToBottom();
    }
  }, [messages, isExpanded, fullHeight]);

  const sendMessage = async () => {
    // Prevent multiple requests with both state and ref check
    if (!input.trim() || isLoading || isRequestInFlight.current) return;

    isRequestInFlight.current = true;
    const userMessage: Message = { role: 'user', content: input.trim() };
    
    // Expand if not already
    if (!isExpanded) {
      setIsExpanded(true);
    }
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 35000);
    try {
      const conversation = [...messages.filter((m, i) => i > 0), userMessage].slice(-10);
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || typeof data.message !== 'string' || !data.message.trim()) {
        throw new Error(data.error || 'Chat unavailable');
      }
      setMessages(prev => [...prev, { role: 'assistant', content: data.message.trim() }]);
    } catch (error) {
      console.error('Faifawi chat request failed:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'اعذرني، الاتصال تعثّر شوي. جرّب ترسل سؤالك مرة ثانية بعد قليل 🌿',
      }]);
    } finally {
      window.clearTimeout(timeout);
      setIsRetrying(false);
      setIsLoading(false);
      isRequestInFlight.current = false;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    if (!fullHeight) setIsExpanded(false);
  };

  if (fullHeight) {
    return (
      <div dir="rtl" className="flex h-full flex-col bg-background">
        {/* Header */}
        <div className="flex items-center justify-center px-5 py-4 border-b border-border/50 bg-background shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h4 className="text-base font-semibold text-foreground">فيفاوي</h4>
              <p className="text-xs text-muted-foreground">مساعدك الذكي</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-secondary' : 'bg-primary'
              }`}>
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-secondary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted text-foreground rounded-tl-sm'
              }`}>
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))}

          {isRetrying && (
            <div className="text-xs text-muted-foreground text-center">
              Service is busy, retrying...
            </div>
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Persistent input */}
        <div className="border-t border-border/50 bg-background p-3 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك..."
              className="flex-1 bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="rounded-xl w-12 h-12 bg-primary hover:bg-primary/90 shrink-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          {/* Attribution */}
          <a
            href="https://www.instagram.com/wu3x?igsh=MTJpMDJsaTV2d3pvOQ%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 mt-2 text-[9px] leading-none text-muted-foreground/35 hover:text-primary transition-colors w-full"
          >
            <User className="w-3 h-3" />
            <span>تطوير بواسطة <strong className="font-semibold">@wu3x</strong></span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="relative">
        <div className={`relative bg-card border-2 border-border/50 rounded-2xl shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-xl ${isExpanded ? 'rounded-b-none border-b-0' : ''}`}>
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => !isExpanded && messages.length > 1 && setIsExpanded(true)}
              placeholder="اسأل الذكاء الاصطناعي..."
              className="flex-1 bg-transparent text-foreground text-base placeholder:text-muted-foreground focus:outline-none"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="rounded-xl w-10 h-10 bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {/* Helper Text */}
          {!isExpanded && (
            <div className="px-5 pb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="w-3.5 h-3.5" />
              <span>مساعدك الذكي "فيفاوي" جاهز للإجابة على استفساراتك</span>
            </div>
          )}
        </div>

        {/* Expanded Chat Panel */}
        {isExpanded && (
          <div className="bg-card border-2 border-t-0 border-border/50 rounded-b-2xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">فيفاوي</h4>
                  <p className="text-xs text-muted-foreground">مساعدك الذكي</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="إغلاق المحادثة"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-secondary' : 'bg-primary'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-secondary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-muted text-foreground rounded-tl-sm'
                  }`}>
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              ))}

              {isRetrying && (
                <div className="text-xs text-muted-foreground text-center">
                  Service is busy, retrying...
                </div>
              )}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Attribution */}
            <a
              href="https://www.instagram.com/wu3x?igsh=MTJpMDJsaTV2d3pvOQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-2 text-[10px] text-muted-foreground/40 hover:text-primary transition-colors bg-background/50"
            >
              <User className="w-3 h-3" />
              <span>تطوير بواسطة <strong className="font-semibold">@wu3x</strong></span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatWidget;
