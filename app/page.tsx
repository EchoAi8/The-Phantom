'use client'

import { useEffect, useState } from 'react'
import ChatInterface from '../components/ChatInterface'

export default function Home() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="fixed inset-0 bg-gradient-to-br from-red-950/10 via-black to-black" />
      
      <div className="relative z-10">
        <header className="border-b border-zinc-900">
          <div className="max-w-screen-2xl mx-auto px-8 py-8 flex items-center justify-between">
            <div className={`text-3xl font-black tracking-tighter ${glitch ? 'glitch' : ''}`}>
              THE PHANTOM
            </div>
            <div className="text-xs text-zinc-700 uppercase tracking-wider">Unauthorized Learning</div>
          </div>
        </header>

        <main className="max-w-screen-xl mx-auto px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-black tracking-tighter leading-[0.9] mb-12">
              Learn Your<br/>
              Way.<br/>
              Not Theirs.
            </h1>
            
            <div className="text-xl text-zinc-400 mb-6 font-sans max-w-2xl leading-relaxed">
              Forget the one-size-fits-all approach they feed you.<br/>
              Visual learner? Audio? Read-write? Kinesthetic?<br/>
              <span className="text-white">I adapt. You don&apos;t.</span>
            </div>

            <div className="text-sm text-zinc-600 mb-16 font-sans border-l-2 border-red-900 pl-4">
              Physics • Chemistry • Biology • Maths<br/>
              Whatever format your brain actually processes
            </div>

            <ChatInterface />

            <div className="mt-20">
              <div className="grid grid-cols-3 gap-px bg-zinc-900">
                <div className="bg-black p-8 border-l-2 border-transparent hover:border-red-900 transition-colors cursor-pointer">
                  <div className="text-xs text-zinc-700 uppercase tracking-wider mb-2">Visual</div>
                  <div className="text-sm text-zinc-400">Cards that stick</div>
                </div>
                <div className="bg-black p-8 border-l-2 border-transparent hover:border-red-900 transition-colors cursor-pointer">
                  <div className="text-xs text-zinc-700 uppercase tracking-wider mb-2">Audio</div>
                  <div className="text-sm text-zinc-400">Rhythms, beats, remember</div>
                </div>
                <div className="bg-black p-8 border-l-2 border-transparent hover:border-red-900 transition-colors cursor-pointer">
                  <div className="text-xs text-zinc-700 uppercase tracking-wider mb-2">Prove</div>
                  <div className="text-sm text-zinc-400">Test yourself raw</div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-xs text-zinc-700 font-sans">
              Coming: AI-generated songs, rhythms, and mnemonic beats
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
