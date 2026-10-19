'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Sparkles, Send, X, Bot, User, RefreshCw } from 'lucide-react';
import type { ChatMessage } from '@/lib/ai/gemini';

export function ResearchAssistant() {
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('assistant');
  const isAr = locale !== 'en';
  const welcomeMessage = t('welcome');

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: welcomeMessage },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialSuggestions = t.raw('suggestions') as string[];

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
            content: t('errorService'),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: t('errorNetwork'),
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
        content: t('resetMessage'),
      },
    ]);
    setSuggestions(initialSuggestions);
    setSource(null);
  };

  return (
    <>
      {/* Floating trigger — a compact round button at the inline end, so it never
          covers content; the label is exposed to assistive tech and as a tooltip. */}
      <aside aria-label={t('label')}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          title={t('label')}
          className="fixed end-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-3 transition-transform duration-(--duration-base) hover:scale-105 focus-visible:shadow-(--focus-ring) focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:scale-100 sm:end-6 sm:bottom-6"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          id="ai-assistant-trigger"
        >
          <Sparkles className="size-6" aria-hidden="true" />
          <span className="sr-only">{t('label')}</span>
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
            <div className="flex items-center justify-between border-b border-border bg-primary px-5 py-4 text-on-primary">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3
                    id="assistant-title"
                    className="text-sm font-bold sm:text-base"
                  >
                    {t('title')}
                  </h3>
                  <p className="flex items-center gap-1 text-[11px] text-white/80">
                    <Sparkles className="h-3 w-3" />
                    {t('subtitle')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  title={t('reset')}
                  aria-label={t('reset')}
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  title={t('close')}
                  aria-label={t('close')}
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
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold select-none ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-surface-muted text-text'
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
                        : 'rounded-bl-none border border-border/50 bg-surface-muted/70 text-text shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 p-2 text-xs text-text-muted">
                  <Bot className="h-4 w-4 animate-spin text-primary" />
                  <span>{t('thinking')}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Source indicator tag */}
            {source && (
              <div className="flex items-center justify-between border-t border-border/40 bg-surface-muted/40 px-4 py-1.5 text-[11px] text-text-muted">
                <span>
                  {source === 'google-ai-studio'
                    ? t('sourceLive')
                    : t('sourceLocal')}
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
                    className="rounded-full border border-border bg-surface-muted/60 px-3 py-1 text-start text-xs text-text transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
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
                  placeholder={t('placeholder')}
                  className="flex-1 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-text transition-all placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={t('send')}
                >
                  <Send className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-2 text-center text-[10px] text-text-muted">
                {t('disclaimer')}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
