'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Sparkles, Send, X, Bot, User, RefreshCw } from 'lucide-react';
import type { ChatMessage } from '@/lib/ai/gemini';

export function ResearchAssistant() {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale !== 'en';
  const welcomeMessage = isAr
    ? 'مرحباً بك! أنا المساعد الأكاديمي الذكي لمركز بحوث حضرموت (مدعوم بواسطة Google AI Studio). كيف يمكنني مساعدتك اليوم في أبحاثك أو استفساراتك عن مجلة المركز وبرامج التدريب والمؤتمرات؟'
    : 'Welcome! I am the Hadramout Research Center AI Assistant (powered by Google AI Studio). How can I assist you with publications, Al-Ahgaff Journal, training programs, or conferences today?';

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: welcomeMessage },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialSuggestions = isAr
    ? [
        'ما هي أعداد مجلة جامعة الأحقاف؟',
        'ما هي البرامج التدريبية المتاحة؟',
        'كيف أشارك في المؤتمر العلمي؟',
        'عن مركز بحوث حضرموت',
      ]
    : [
        'Al-Ahgaff Journal issues',
        'Available training programs',
        'Scientific conference guidelines',
        'About Hadramout Research Center',
      ];

  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: query },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          locale,
          history: messages.slice(-4),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply || '...' },
        ]);
        setSource(data.source || null);
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: isAr
              ? 'عذراً، تعذر الاتصال بالخدمة مؤقتاً. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر صفحة اتصل بنا.'
              : 'Sorry, temporary connection error. Please try again or reach out directly through our Contact page.',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isAr
            ? 'حدث خطأ في الشبكة أثناء معالجة الطلب.'
            : 'A network error occurred while processing your request.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: isAr
          ? 'تم بدء محادثة جديدة. تفضل بطرح استفسارك الأكاديمي أو البحثي.'
          : 'New session started. Feel free to ask any academic or research inquiry.',
      },
    ]);
    setSuggestions(initialSuggestions);
    setSource(null);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <aside
        aria-label={isAr ? 'المساعد الأكاديمي الذكي' : 'AI Research Assistant'}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 z-40 flex items-center gap-2.5 rounded-full px-4 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ${
            isAr
              ? 'to-primary-hover left-6 bg-gradient-to-r from-primary'
              : 'to-primary-hover right-6 bg-gradient-to-r from-primary'
          }`}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          id="ai-assistant-trigger"
        >
          <span className="flex h-7 w-7 animate-pulse items-center justify-center rounded-full bg-white/20 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium">
            {isAr ? 'المساعد الأكاديمي الذكي' : 'AI Research Assistant'}
          </span>
          <span className="bg-secondary/80 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
            AI
          </span>
        </button>
      </aside>

      {/* Assistant Modal / Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
          className="animate-in fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm duration-200 sm:items-center sm:p-4"
        >
          <div
            className="flex h-[88vh] w-full flex-col overflow-hidden rounded-t-2xl border border-border/80 bg-surface shadow-2xl sm:h-[620px] sm:max-w-lg sm:rounded-2xl"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="to-primary-hover flex items-center justify-between border-b border-border bg-gradient-to-r from-primary px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3
                    id="assistant-title"
                    className="text-sm font-bold sm:text-base"
                  >
                    {isAr
                      ? 'مساعد أبحاث مركز حضرموت'
                      : 'HRC Research Assistant'}
                  </h3>
                  <p className="flex items-center gap-1 text-[11px] text-white/80">
                    <Sparkles className="h-3 w-3" />
                    {isAr
                      ? 'مدعوم بنموذج Google AI Studio (Gemini)'
                      : 'Powered by Google AI Studio (Gemini)'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  title={isAr ? 'بدء محادثة جديدة' : 'Reset session'}
                  aria-label={isAr ? 'بدء محادثة جديدة' : 'Reset session'}
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  title={isAr ? 'إغلاق' : 'Close'}
                  aria-label={isAr ? 'إغلاق' : 'Close'}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    msg.role === 'user'
                      ? isAr
                        ? 'flex-row-reverse'
                        : 'flex-row-reverse'
                      : 'flex-row'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold select-none ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-br-none bg-primary text-white'
                        : 'bg-muted/70 text-foreground rounded-bl-none border border-border/50 shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="text-muted-foreground flex items-center gap-3 p-2 text-xs">
                  <Bot className="h-4 w-4 animate-spin text-primary" />
                  <span>
                    {isAr
                      ? 'جارٍ التحليل وصياغة الرد العلمي...'
                      : 'Analyzing and generating response...'}
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Source indicator tag */}
            {source && (
              <div className="bg-muted/40 text-muted-foreground flex items-center justify-between border-t border-border/40 px-4 py-1.5 text-[11px]">
                <span>
                  {source === 'google-ai-studio'
                    ? isAr
                      ? 'تم التوليد المباشر عبر Google AI Studio (Gemini)'
                      : 'Live generation via Google AI Studio (Gemini)'
                    : isAr
                      ? 'قاعدة المعرفة الأكاديمية لمركز بحوث حضرموت'
                      : 'HRC Academic Knowledge Engine'}
                </span>
                <span className="flex items-center gap-1 text-primary">
                  <Sparkles className="h-3 w-3" />
                  HRC AI
                </span>
              </div>
            )}

            {/* Suggestion Chips */}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 overflow-x-auto border-t border-border/60 bg-surface px-4 py-2.5">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(sug)}
                    className="bg-muted/60 text-foreground rounded-full border border-border px-3 py-1 text-start text-xs transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-border bg-surface p-3 sm:p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isAr
                      ? 'اطرح استفسارك الأكاديمي أو البحثي...'
                      : 'Ask your academic or research inquiry...'
                  }
                  className="bg-background text-foreground placeholder:text-muted-foreground flex-1 rounded-xl border border-border px-4 py-2.5 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="hover:bg-primary-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={isAr ? 'إرسال' : 'Send'}
                >
                  <Send className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="text-muted-foreground mt-2 text-center text-[10px]">
                {isAr
                  ? 'مساعد أكاديمي ذكي مدعوم بتقنيات الذكاء الاصطناعي من جامعة الأحقاف ونوفكسا'
                  : 'Scholarly research assistant powered by Al-Ahgaff University & Novixa'}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
