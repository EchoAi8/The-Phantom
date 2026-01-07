'use client'

import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "I'm The Phantom. Ask me anything. No filters." }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: `You're The Phantom. Brutally direct. No sugarcoating. Teach maths, physics, chemistry, biology. Adapt to learning styles - visual diagrams, audio mnemonics, whatever clicks. Short sentences. Punchy. No fluff. Call out traditional education BS when you see it. When they get it right, acknowledge it. When they're wrong, correct without being condescending.`,
          messages: messages.concat(userMsg).map(m => ({ role: m.role, content: m.content }))
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      const aiMsg = { role: 'assistant' as const, content: data.content[0]?.text || 'Connection dropped.' }
      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border border-zinc-900 bg-black">
      <div className="border-b border-zinc-900 px-6 py-3 flex items-center justify-between">
        <div className="text-xs text-zinc-700 uppercase tracking-wider">Live Session</div>
        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
      </div>

      <div className="h-[500px] overflow-y-auto p-8 space-y-6 font-sans">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            {msg.role === 'assistant' && (
              <div className="text-xs text-zinc-700 uppercase tracking-wider mb-2 font-mono">THE PHANTOM</div>
            )}
            <div className={`inline-block max-w-[85%] ${
              msg.role === 'user'
                ? 'bg-white text-black px-5 py-3 font-medium'
                : 'text-zinc-300 leading-relaxed'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="text-xs text-zinc-700 uppercase tracking-wider mb-2 font-mono">THE PHANTOM</div>
            <div className="text-zinc-600">Thinking...</div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-900 p-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything"
          className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-700 font-sans text-lg focus:ring-0"
        />
      </div>
    </div>
  )
}
