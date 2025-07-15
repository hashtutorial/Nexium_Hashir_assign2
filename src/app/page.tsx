'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Moon, Loader2 } from 'lucide-react';

export default function BlogSummarizer() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [error, setError] = useState('');

  const isURL = url.trim().startsWith('http://') || url.trim().startsWith('https://');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isURL) {
      setError('Please enter a valid blog URL.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ input: url }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setSummary(data.summary || 'No summary returned.');
    } catch (err) {
      console.error(err);
      setSummary('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="relative min-h-screen bg-white text-black dark:bg-[#0D0D0D] dark:text-white flex items-center justify-center px-4 py-10">

        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full border border-neutral-300 dark:border-neutral-700 shadow-sm hover:shadow-md transition-colors duration-300 bg-white/80 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 backdrop-blur-sm cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-500" />
            )}
          </Button>
        </div>

        {/* Content */}
        <div className="max-w-2xl w-full text-center space-y-8 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-lime-400 bg-clip-text text-transparent animate-text-glow">
  Snap<span className="text-cyan-400">Summary</span>
</h1>
          <p className="text-base md:text-lg">
            Paste any blog URL to instantly receive a short Urdu summary.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="url"
              placeholder="Paste blog URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white"
            />

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 text-left px-1">{error}</p>
            )}
<Button
  type="submit"
  disabled={loading || !isURL}
  className={`w-full 
    bg-gradient-to-r from-cyan-400 via-blue-500 to-lime-400 
    hover:from-cyan-300 hover:via-blue-400 hover:to-lime-300 
    text-black font-semibold 
    disabled:opacity-60 
    cursor-pointer 
    flex items-center justify-center gap-2 
    transition-all duration-300 
    shadow-md hover:shadow-xl 
    shadow-cyan-500/30 hover:shadow-lime-400/50`}
>
  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
  {loading ? 'Summarizing...' : 'Summarize'}
</Button>

          </form>

          {/* Summary Output */}
          {summary && (
            <Card className="bg-neutral-100 dark:bg-neutral-900 text-left border border-neutral-300 dark:border-neutral-700 shadow-lg">
              <CardContent className="p-6 space-y-2">
                <h2 className="text-cyan-400 text-xl font-bold">خلاصہ:</h2>
                <p className="whitespace-pre-line leading-relaxed" lang="ur">{summary}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes text-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        .animate-text-glow {
          animation: text-glow 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
