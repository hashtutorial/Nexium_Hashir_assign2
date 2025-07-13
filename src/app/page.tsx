'use client';
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogSummarizer() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const MIN_LENGTH = 100;
  const isURL = input.trim().startsWith('http://') || input.trim().startsWith('https://');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isURL && input.trim().length < MIN_LENGTH) {
      setError(`Please enter at least ${MIN_LENGTH} characters or a valid blog URL.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error summarizing blog:', error);
      setSummary('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="max-w-2xl w-full text-center space-y-8 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          Snap<span className="text-violet-400">Summary</span>
        </h1>
        <p className="text-white">
          Digest blogs fast—just paste the text or URL and get a summary instantly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
            }}
            rows={6}
            placeholder="Paste blog text or enter a public blog URL (Minimum 100 characters for blog text)"
            className="bg-neutral-900 border border-neutral-700 text-white"
          />

          {error && (
            <p className="text-sm text-red-400 text-left px-1">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading || (!isURL && input.trim().length < MIN_LENGTH)}
            className="w-full bg-violet-700 hover:bg-violet-500 cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Summarize Now'}
          </Button>
        </form>

        {summary && (
          <Card className="bg-neutral-900 text-left border border-neutral-700 shadow-lg">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-violet-400 text-xl font-bold">Summary:</h2>
              <p className="text-white whitespace-pre-line">{summary}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
